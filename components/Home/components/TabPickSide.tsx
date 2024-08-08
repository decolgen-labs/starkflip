import React from "react";

import PickHead from "./PickHead";
import PickEntry from "./PickEntry";
const TabPickSide = ({
  coin,
  setCoin,
  handleGame,
  setStaked,
  setAmount,
  staked,
  statusWon,
  resetGame,
  refetch,
  statusFlip,
  setStatusFlip,
  isFlipping,
}: any) => {
  const borderColorStt =
    statusWon == null ? "#00FFB3" : statusWon ? "#00FFB3" : "secondary.200";
  return (
    <React.Fragment>
      <PickHead
        setCoin={setCoin}
        statusFlip={statusFlip}
        statusWon={statusWon}
      />
      <PickEntry
        status={status}
        handleGame={handleGame}
        setStaked={setStaked}
        setAmount={setAmount}
        staked={staked}
        coin={coin}
        statusWon={statusWon}
        resetGame={resetGame}
        isFlipping={isFlipping}
        statusFlip={statusFlip}
        setStatusFlip={setStatusFlip}
      />
    </React.Fragment>
  );
};

export default TabPickSide;
