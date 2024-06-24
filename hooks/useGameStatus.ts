import React from "react";

export type StarkFlipStatus = "started" | "settling" | "end";

export interface FlipStatus {
  status: StarkFlipStatus;
  transactionHash?: string;
  isWon?: boolean;
}
const inititalFlipStatus: FlipStatus = {
  status: "end",
  transactionHash: undefined,
  isWon: undefined,
};

export const useGameStatus = () => {
  const [gameStatus, setGameStatus] =
    React.useState<FlipStatus>(inititalFlipStatus);
  return {
    gameStatus,
    setGameStatus,
  };
};
