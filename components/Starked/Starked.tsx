import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import config from "../../config/config";

import Flip from "../Flip/Flip";

import { setUserLoading } from "@/redux/user/user-slice";

import { CONTRACT_ADDRESS, RPC_PROVIDER } from "@/utils/constants";
import {
  CallData,
  uint256,
  shortString,
  stark,
  Account,
  Contract,
  Provider,
  num,
} from "starknet";
import { useToast } from "@chakra-ui/react";
import { convertPropertiesToNumber } from "@/utils/parseData";
import { useAuth } from "@/hooks/useAuth";

export default function Starked({ fetchBalance }: any) {
  const [staked, setStaked] = useState<number>(0);
  const [amount, setAmount] = useState<number>(1);
  const [statusWon, setStatusWon] = useState<any>();
  const [statusFlip, setStatusFlip] = useState<boolean>(false);
  const [isCancel, setIsCancel] = useState<boolean>(false);
  const [currentIDGame, setCurrentIDGame] = useState<string | undefined>(
    undefined
  );
  const { isLoading } = useAuth();
  const dispatch = useDispatch();

  const [coin, setCoin] = useState(0);
  const toast = useToast({
    position: "top",
    duration: 10000,
  });
  const { account } = useAccount();

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
              spender: config.contractAddress,
              amount: uint256.bnToUint256(amount * 1e18),
            }),
          },

          {
            contractAddress: config.contractAddress,
            entrypoint: "create_game",
            calldata: CallData.compile({
              pool_id: config.poolId,
              staked: uint256.bnToUint256(amount * 1e18),
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
  const getEvent = async (transactionHash: string) => {
    const provider = new Provider({
      nodeUrl: RPC_PROVIDER.MAINET,
    });

    const { abi } = await provider.getClassAt(config.contractAddress);

    const contract = new Contract(abi, config.contractAddress, provider);
    await provider.waitForTransaction(transactionHash);

    const txReceipt = await provider.getTransactionReceipt(transactionHash);

    const parsedEvent = contract.parseEvents(txReceipt);

    const dataParse = convertPropertiesToNumber(
      parsedEvent[0]["starkflip::starkflip::StarkFlip::StarkFlip::CreateGame"]
    );

    const idGame = num.toHex(dataParse.id as any);
    setCurrentIDGame(() => idGame);
    const ResultTransactionHash = await verifyMsg(
      provider,
      dataParse,
      contract,
      idGame
    );
    const txResultReceipt = await provider.getTransactionReceipt(
      ResultTransactionHash
    );
    const parsedResultEvent = contract.parseEvents(txResultReceipt);
    const dataResult = convertPropertiesToNumber(
      parsedResultEvent[0][
        "starkflip::starkflip::StarkFlip::StarkFlip::SettleGame"
      ]
    );
    const isWon = dataResult.is_won;

    return { idGame, isWon };
  };
  const verifyMsg = async (
    provider: any,
    parsedEvent: any,
    contract: any,
    idGame: string
  ) => {
    try {
      const accountAddress = config.accountAddress as any;
      const privateKey = config.privateKey as any;

      const accountAX = new Account(provider, accountAddress, privateKey);
      // console.log(Number(parsedEvent.guess));
      // console.log(BigInt(parsedEvent.seed).toString());
      const types = {
        StarkNetDomain: [
          { name: "name", type: "felt" },
          { name: "version", type: "felt" },
          { name: "chainId", type: "felt" },
        ],
        Settle: [
          { name: "game_id", type: "felt" },
          { name: "guess", type: "u8" },
          { name: "seed", type: "u128" },
        ],
      };

      const typedDataValidate = {
        types,
        primaryType: "Settle",
        domain: {
          name: "StarkFlip",
          version: "1",
          chainId: shortString.encodeShortString("SN_MAIN"),
        },
        message: {
          game_id: idGame,
          guess: Number(parsedEvent.guess),
          seed: BigInt(parsedEvent.seed).toString(),
        },
      };

      const signature = await accountAX.signMessage(typedDataValidate);
      const arr = stark.formatSignature(signature);

      contract.connect(accountAX);
      const myCall = contract.populate("settle", [idGame, arr]);

      const res = await contract.settle(myCall.calldata);

      await provider.waitForTransaction(res.transaction_hash);
      return res.transaction_hash;
    } catch (error) {
      console.log("Error Settle", error);
      toast({
        title: "Confirm To Close Pool The Game.",
        description:
          "An error occurred while playing the game, you are  creating many game with someone in the same time in a block of starknet",
        status: "info",
        isClosable: true,
        duration: 5000,
      });
      setIsCancel(() => true);
      dispatch(setUserLoading(false));
    }
  };
  const resetGame = () => {
    setCoin(0);
    setStatusWon(undefined);
    fetchBalance();
    setIsCancel(false);
    setStatusFlip(false);
    setCurrentIDGame(undefined);
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
  const handleCancel = async () => {
    try {
      if (account && currentIDGame) {
        dispatch(setUserLoading(true));

        const { transaction_hash } = await account.execute([
          {
            contractAddress: config.contractAddress,
            entrypoint: "cancel_game",
            calldata: CallData.compile({
              game_id: currentIDGame,
            }),
          },
        ]);
        console.log("Account Cancel Game", transaction_hash);
        resetGame();
        dispatch(setUserLoading(false));
      }
    } catch (error) {
      console.error("Error in CancelGame:", error);
    }
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
        isCancel={isCancel}
        handleCancelGame={handleCancel}
      />
    </>
  );
}
