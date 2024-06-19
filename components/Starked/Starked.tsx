import {
  useAccount,
  useBalance,
  useContract,
  useContractRead,
  useContractWrite,
  useNetwork,
} from "@starknet-react/core";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import config from "../../config/config";
import { getEvent } from "../Contract/contract";
import Flip from "../Flip/Flip";

import { setUserLoading } from "@/redux/user/user-slice";
import { ABIS } from "@/abis";
export default function Starked() {
  const [staked, setStaked] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0.002);
  const [statusWon, setStatusWon] = useState<any>();
  const [statusFlip, setStatusFlip] = useState<boolean>(false);

  const { address } = useAccount();
  const dispatch = useDispatch();
  const { refetch } = useBalance({
    address,
    watch: true,
  });
  const [coin, setCoin] = useState(0);

  const { chain } = useNetwork();
  const { contract } = useContract({
    abi: ABIS.starknetAbi,
    address: config.contractAddress,
  });

  const { contract: contractToken } = useContract({
    abi: ABIS.ethAbi,
    address: chain.nativeCurrency.address,
  });

  const callsApprove = useMemo(() => {
    if (!address || !contract) return [];
    return contractToken?.populateTransaction["approve"]!(
      config.contractAddress,
      0.1 * 1e18
    );
  }, [address, contract, contractToken?.populateTransaction]);

  const calls = useMemo(() => {
    if (!address || !contract) return [];
    return contract.populateTransaction["create_game"]!(
      config.poolId,
      amount * 1e18,
      coin
    );
  }, [address, contract, amount, coin]);

  const { data: isApprove } = useContractRead({
    functionName: "allowance",
    args: [address as string, config.contractAddress],
    abi: ABIS.ethAbi,
    address:
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    watch: true,
  });

  const {
    writeAsync,
    data: dataWrite,
    isPending,
  } = useContractWrite({
    calls,
  });

  const {
    writeAsync: writeApprove,
    data: dataApprove,
    isPending: isPendingApprove,
  } = useContractWrite({
    calls: callsApprove,
  });

  useEffect(() => {}, [dataWrite]);

  const handleSettle = async (transactionHash: string) => {
    if (transactionHash) {
      let isWon;
      const maxAttempts = 10;
      let isFinish = false;
      let attempts = 0;
      dispatch(setUserLoading(true));
      while (!isFinish && attempts < maxAttempts) {
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const result = await getEvent(transactionHash);

          if (result && result.isWon !== undefined) {
            isWon = result.isWon;
          }

          isFinish = true;
        } catch (error) {
          attempts++;
          console.error("Error in handleSettle:", error);
        }
      }

      if (!isFinish) {
        alert("Settle failed");
        return;
      }

      if (isWon !== undefined) {
        setStatusWon(isWon);
      } else {
        console.error("No valid data found on the blockchain");
      }
      dispatch(setUserLoading(false));
    }
  };
  const handleGame = async () => {
    try {
      if (Number(isApprove) >= amount * 1e18) {
        const createGame = await writeAsync();
        await handleSettle(createGame?.transaction_hash);
      } else {
        await writeApprove();
      }
    } catch (error) {
      console.error("Error in handleGame:", error);
    }
  };

  const resetGame = () => {
    setCoin(0);
    setStatusWon(undefined);
    refetch();
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
        refetch={refetch}
        statusFlip={statusFlip}
        setStatusFlip={setStatusFlip}
      />
    </>
  );
}
