import { useAccount } from "@starknet-react/core";
import { useState } from "react";
import { useDispatch } from "react-redux";

import config from "../../config/config";
import { getEvent } from "../Contract/contract";
import Flip from "../Flip/Flip";

import { setUserLoading } from "@/redux/user/user-slice";

import { CONTRACT_ADDRESS } from "@/utils/constants";
import { CallData, uint256 } from "starknet";
import { useToast } from "@chakra-ui/react";

export default function Starked({ fetchBalance }: any) {
  const [staked, setStaked] = useState<number>(0);
  const [amount, setAmount] = useState<number>(1);
  const [statusWon, setStatusWon] = useState<any>();
  const [statusFlip, setStatusFlip] = useState<boolean>(false);

  const dispatch = useDispatch();

  const [coin, setCoin] = useState(0);

  const { account } = useAccount();
  const toast = useToast({
    position: "top",
    duration: 10000,
  });
  const handleSettle = async (transactionHash: string) => {
    try {
      if (transactionHash) {
        let isWon;

        dispatch(setUserLoading(true));

        const result = await getEvent(transactionHash);

        if (result && result.isWon !== undefined) {
          isWon = result.isWon;
        }

        if (isWon !== undefined) {
          setStatusWon(isWon);
        } else {
          console.error("No valid data found on the blockchain");
        }
        await fetchBalance();
        dispatch(setUserLoading(false));
      }
    } catch (error) {
      console.log("Error Sta", error);
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
              spender: config.contractAddress,
              amount: uint256.bnToUint256(amount * 1e18),
            }),
          },

          {
            contractAddress: config.contractAddress,
            entrypoint: "create_game",
            calldata: CallData.compile({
              pool_id: config.poolId,
              staked: uint256.bnToUint256(1e18),
              guess: 0,
            }),
          },
        ]);
        await handleSettle(transaction_hash);
      }
    } catch (error) {
      console.error("Error in handleGame:", error);
      toast({
        title: "Report To Close Pool The Game in Twitter: @starkarcade",
        description:
          "An error occurred while playing the game, you try to create many game in a block of starknet.Please feedback to close the pool , money will be refunded to your account. X:(@starkarcade)",
        status: "info",
        isClosable: true,
        duration: null,
      });
    }
  };

  const resetGame = () => {
    setCoin(0);
    setStatusWon(undefined);
    fetchBalance();
    setStatusFlip(false);
  };

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
        statusFlip={statusFlip}
        setStatusFlip={setStatusFlip}
      />
    </>
  );
}
