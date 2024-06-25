import { ACCESS_TOKEN } from "@/utils/constants";

import { Socket, io } from "socket.io-client";
import config from "./config";
import { getCookie } from "@/utils/cookie";

export let socketAPI: Socket;

export const connectSocket = () => {
  socketAPI = io(config().PUBLIC_SOCKET);

  socketAPI.on("connect", () => {
    console.log("Connected to the server");
  });
};
export const disconnectSocket = () => {
  socketAPI.disconnect();
};

export const startNewGame = () => {
  if (!socketAPI) {
    connectSocket();
  }
  socketAPI.emit("startNewGame");
};

export const handleSettle = (transaction_hash: string) => {
  socketAPI.emit("handleStettle", {
    transactionHash: transaction_hash,
  });
};
