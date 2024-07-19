import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import TabTopRank from "./TabTopRank";
import TabRentlyWin from "./TabRentlyWin";

const HomeTab = () => {
  return (
    <Tabs padding={4} variant="primary">
      <TabList>
        <Tab>Top Rank</Tab>
        <Tab>Recent win</Tab>
      </TabList>
      <TabPanels>
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
