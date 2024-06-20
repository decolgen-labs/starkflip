import {
  Account,
  Contract,
  RpcProvider,
  shortString,
  stark,
  typedData,
} from "starknet";

import config from "../../config/config";
import { ABIS } from "@/abis";

export const getEvent = async (transactionHash: string) => {
  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
  });

  const contract = new Contract(
    ABIS.starknetAbi,
    config.contractAddress,
    provider
  );
  await provider.waitForTransaction(transactionHash);

  const txReceipt = await provider.getTransactionReceipt(transactionHash);
  console.log(txReceipt);

  const parsedEvent = contract.parseEvents(txReceipt);
  console.log(parsedEvent[0].CreateGame.id);

  const idGame = "0x" + parsedEvent[0].CreateGame.id.toString(16);

  const ResultTransactionHash = await verifyMsg(
    provider,
    parsedEvent,
    contract,
    idGame
  );
  const txResultReceipt = await provider.getTransactionReceipt(
    ResultTransactionHash
  );
  const parsedResultEvent = contract.parseEvents(txResultReceipt);
  const isWon = parsedResultEvent[0].SettleGame.is_won;

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
        chainId: shortString.encodeShortString("SN_SEPOLIA"),
      },
      message: {
        game_id: idGame,
        guess: Number(parsedEvent[0].CreateGame.guess),
        seed: parsedEvent[0].CreateGame.seed.toString(),
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
    console.log(error);
  }
};
