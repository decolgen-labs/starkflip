import {
  Account,
  Contract,
  Provider,
  ResponseParser,
  json,
  num,
  shortString,
  stark,
  uint256,
} from "starknet";

import config from "../../config/config";
import { convertPropertiesToNumber, convertToNumber } from "@/utils/parseData";

export const getEvent = async (transactionHash: string) => {
  const provider = new Provider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
  });

  const { abi } = await provider.getClassAt(config.contractAddress);

  const contract = new Contract(abi, config.contractAddress, provider);
  await provider.waitForTransaction(transactionHash);

  const txReceipt = await provider.getTransactionReceipt(transactionHash);

  const parsedEvent = contract.parseEvents(txReceipt);
  console.log("Paras", parsedEvent);
  const dataParse = convertPropertiesToNumber(
    parsedEvent[0]["starkflip::starkflip::StarkFlip::StarkFlip::CreateGame"]
  );

  const idGame = num.toHex(dataParse.id as any);

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
    console.log("ID", idGame);
    console.log(Number(parsedEvent.guess));
    console.log(BigInt(parsedEvent.seed).toString());
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
    console.log(error);
  }
};
