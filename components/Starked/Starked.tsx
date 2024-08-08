import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";

import config from "../../config/config";

import { CONTRACT_ADDRESS, RPC_PROVIDER } from "@/utils/constants";
import { CallData, uint256, Provider } from "starknet";

import { socketAPI, startNewGame } from "@/config/socketConfig";
import { Box, useToast } from "@chakra-ui/react";
import Header from "../Header";
import HomeTab from "../Home/HomeTab";
import FlipMain from "../Flip/FlipMain";

export default function Starked({
  fetchBalance,
  isLoadingBalance,
  balance,
}: any) {
  const [staked, setStaked] = useState<number>(0);
  const [amount, setAmount] = useState<number>(1);
  const [statusWon, setStatusWon] = useState<boolean | null>(null);
  const [statusFlip, setStatusFlip] = useState<boolean>(false);

  const [isFlipping, setIsFlipping] = useState(false);

  const [coin, setCoin] = useState(0);

  const { account } = useAccount();
  const handleSettle = async (transactionHash: string) => {
    try {
      if (transactionHash) {
        await getEvent(transactionHash);
      }
    } catch (error) {
      console.log("Error Da", error);
    }
  };
  const handleGame = async () => {
    try {
      if (account) {
        setIsFlipping(() => true);
        const { transaction_hash } = await account.execute([
          {
            contractAddress: CONTRACT_ADDRESS.STRK,
            entrypoint: "approve",
            calldata: CallData.compile({
              spender: config().FLIP_CONTRACT_ADDRESS,
              amount: uint256.bnToUint256(amount * 1e18),
            }),
          },
          {
            contractAddress: config().FLIP_CONTRACT_ADDRESS,
            entrypoint: "create_game",
            calldata: CallData.compile({
              pool_id: config().POOL_ID,
              staked: uint256.bnToUint256(amount * 1e18),
              guess: 0,
            }),
          },
        ]);
        const registerGame = toast({
          id: "creating-on-chain-game",
          title: "Creating On-Chain Game",
          description: " waiting for on-chain confirmation ...",
          status: "loading",
          duration: null,
        });
        await handleSettle(transaction_hash);
        fetchBalance();
        startNewGame();

        if (socketAPI) {
          socketAPI.on("gameResult", (data: any) => {
            if (data.isWon != null) {
              setIsFlipping(() => false);
              setStatusWon(() => data.isWon);
              toast.close(registerGame);
              fetchBalance();
            }
          });
        }
      }
    } catch (error) {
      setIsFlipping(() => false);
    }
  };
  const getEvent = async (transactionHash: string) => {
    const provider = new Provider({
      nodeUrl: RPC_PROVIDER.MAINET,
    });

    await provider.waitForTransaction(transactionHash);

    socketAPI.emit("handleStettle", {
      transactionHash: transactionHash,
    });
  };

  const resetGame = () => {
    setCoin(0);
    setStatusWon(null);
    fetchBalance();
    setIsFlipping(() => false);
    setStatusFlip(false);
    startNewGame();
  };
  useEffect(() => {
    resetGame();
  }, []);
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message =
        "Are you sure you want to leave? Your changes may relate to error of game.";
      event.preventDefault();
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const toast = useToast();

  return (
    <>
      <Header balance={balance} isLoading={isLoadingBalance} />
      <Box
        position="absolute"
        top="15%"
        zIndex="popover"
        left={"12%"}
        display={{
          md: "block",
          base: "none",
        }}
      >
        <HomeTab
          coin={coin}
          setCoin={setCoin}
          handleGame={handleGame}
          setAmount={setAmount}
          setStaked={setStaked}
          staked={staked}
          resetGame={resetGame}
          statusWon={statusWon}
          isFlipping={isFlipping}
          statusFlip={statusFlip}
          refetch={fetchBalance}
          setStatusFlip={setStatusFlip}
        />
      </Box>
      <FlipMain
        statusWon={statusWon}
        coin={coin}
        setStatusFlip={setStatusFlip}
      />
    </>
  );
}
