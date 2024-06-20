import { useAccount } from "@starknet-react/core";
import { useState } from "react";
import { useDispatch } from "react-redux";

import config from "../../config/config";
import { getEvent } from "../Contract/contract";
import Flip from "../Flip/Flip";

import { setUserLoading } from "@/redux/user/user-slice";

import { CONTRACT_ADDRESS } from "@/utils/constants";
import { CallData, RpcProvider, uint256 } from "starknet";
export default function Starked() {
  const [staked, setStaked] = useState<number>(0);
  const [amount, setAmount] = useState<number>(1);
  const [statusWon, setStatusWon] = useState<any>();
  const [statusFlip, setStatusFlip] = useState<boolean>(false);

  const dispatch = useDispatch();

  const [coin, setCoin] = useState(0);

  const { account } = useAccount();
  const handleSettle = async (transactionHash: string) => {
    try {
      if (transactionHash) {
        let isWon;

        let isFinish = false;

        dispatch(setUserLoading(true));
        const provider = new RpcProvider({
          nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
        });

        await provider.waitForTransaction(transactionHash);

        const result = await getEvent(transactionHash);
        console.log("What Result", result);
        if (result && result.isWon !== undefined) {
          isWon = result.isWon;
        }

        if (isWon !== undefined) {
          setStatusWon(isWon);
        } else {
          console.error("No valid data found on the blockchain");
        }
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
    }
  };

  const resetGame = () => {
    setCoin(0);
    setStatusWon(undefined);

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
