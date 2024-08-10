import React from "react";
import { Box, Flex, RadioGroup, Text, Icon, Radio } from "@chakra-ui/react";

import HeadIcon from "@/public/assets/coin/head.svg";
import TailIcon from "@/public/assets/coin/tail_1.svg";
const PickHead = ({ setCoin, statusFlip, statusWon }: any) => {
  const borderColorStt =
    statusWon == null ? "#00FFB3" : statusWon ? "#00FFB3" : "secondary.200";
  return (
    <RadioGroup defaultValue="1">
      <Flex
        gap={{ md: 8, base: 2 }}
        alignItems="center"
        justifyContent={"space-between"}
        textColor="#D4D4D8"
      >
        <Box
          w={{ lg: "9.5rem", base: "fit-content" }}
          px={4}
          display="flex"
          flexDir="column"
          alignItems="center"
          py={3}
          gap={1}
          textAlign={"center"}
        >
          <Text whiteSpace={"pre"} fontSize="lg" fontWeight={700}>
            HEADS
          </Text>
          <Icon
            as={HeadIcon}
            h={{ lg: "120px", base: "40px" }}
            w={{ lg: "120px", base: "40px" }}
          />
          <Radio
            isDisabled={statusFlip != null ? statusFlip : undefined}
            mt={2}
            colorScheme="green"
            value="1"
            size={"lg"}
            onClick={() => {
              setCoin(0);
            }}
          ></Radio>
        </Box>

        <Box
          w={{ lg: "9.5rem", base: "fit-content" }}
          px={4}
          display="flex"
          flexDir="column"
          alignItems="center"
          gap={1}
          py={3}
          textAlign={"center"}
        >
          <Text my={0} whiteSpace={"pre"} fontSize="lg" fontWeight={700}>
            TAILS
          </Text>
          <Icon
            as={TailIcon}
            h={{ lg: "120px", base: "40px" }}
            w={{ lg: "120px", base: "40px" }}
          />
          <Radio
            isDisabled={statusFlip != null ? statusFlip : undefined}
            mt={2}
            colorScheme="green"
            value="2"
            size={"lg"}
            onClick={() => {
              setCoin(1);
            }}
          ></Radio>
        </Box>
      </Flex>
    </RadioGroup>
  );
};

export default PickHead;
