import {
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import TabTopRank from "./TabTopRank";
import TabRentlyWin from "./TabRentlyWin";
import StarknetIcon from "@/public/assets/icons/starknet.svg";
import TabPickSide from "./components/TabPickSide";
const HomeTab = ({
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
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  return (
    <Tabs padding={4} variant="primary" onChange={handleTabsChange}>
      <HStack justifyContent="space-between">
        <TabList>
          <Tab>Pick Side</Tab>
          <Tab>Top Rank</Tab>
          <Tab>Recent win</Tab>
        </TabList>
        {tabIndex === 1 && (
          <HStack fontWeight="bold">
            <Icon as={StarknetIcon} />
            <Text color="white">Win</Text>
          </HStack>
        )}
      </HStack>
      <TabPanels>
        <TabPanel>
          <TabPickSide
            isFlipping={isFlipping}
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
        </TabPanel>
        <TabPanel>
          <TabTopRank />
        </TabPanel>
        <TabPanel>
          <TabRentlyWin />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default HomeTab;
