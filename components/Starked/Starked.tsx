import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import config from "../../config/config";

import Flip from "../Flip/Flip";

import { setUserLoading } from "@/redux/user/user-slice";

import { CONTRACT_ADDRESS, RPC_PROVIDER } from "@/utils/constants";
import { CallData, uint256, Provider } from "starknet";

import { connectSocket, socketAPI, startNewGame } from "@/config/socketConfig";
import { useToast } from "@chakra-ui/react";

export default function Starked({ fetchBalance }: any) {
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
        setIsFlipping(() => true);

        await getEvent(transactionHash);

        await fetchBalance();
      }
    } catch (error) {
      console.log("Error Da", error);
    }
  };
  const handleGame = async () => {
    try {
      if (account) {
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

        await handleSettle(transaction_hash);
        startNewGame();
      }
    } catch (error) {
      console.error("Error in handleGame:", error);
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
    startNewGame();
    setCoin(0);
    setStatusWon(null);
    fetchBalance();
    setStatusFlip(false);
  };
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
  useEffect(() => {
    if (!socketAPI) {
      connectSocket();
    }
    if (socketAPI) {
      socketAPI.on("gameResult", (data: any) => {
        if (data.isWon != null) {
          setIsFlipping(() => false);
          setStatusWon(() => data.isWon);
        }
      });
    }
  }, [socketAPI]);
  const toast = useToast();

  return (
    <>
      <Flip
        coin={coin}
        setCoin={setCoin}
        handleGame={handleGame}
        setStaked={setStaked}
        setAmount={setAmount}
        staked={staked}
        statusWon={statusWon}
        resetGame={resetGame}
        isFlipping={isFlipping}
        statusFlip={statusFlip}
        setStatusFlip={setStatusFlip}
      />
      {isFlipping &&
        toast({
          title: "Creating On-Chain Game",
          description: " waiting for on-chain confirmation ...",
          status: "loading",
          duration: null,
          isClosable: true,
        })}
    </>
  );
}
