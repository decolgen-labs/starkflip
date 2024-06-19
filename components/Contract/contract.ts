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
    nodeUrl:
      "https://starknet-goerli.infura.io/v3/7d290a76648a4bac93e5f98aa0d463ce",
  });

  const contract = new Contract(
    ABIS.starknetAbi,
    config.contractAddress,
    provider
  );

  const txReceipt = await provider.getTransactionReceipt(transactionHash);

  const parsedEvent = contract.parseEvents(txReceipt);

  const idGame = "0x" + parsedEvent[0].CreateGame.id.toString(16);

  console.log(idGame);
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
        name: "dappName",
        version: "1",
        chainId: shortString.encodeShortString("SN_GOERLI"),
      },
      message: {
        game_id: idGame,
        guess: Number(parsedEvent[0].CreateGame.guess),
        seed: parsedEvent[0].CreateGame.seed.toString(),
      },
    };

    const hashMsg = typedData.getMessageHash(typedDataValidate, accountAddress);

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
