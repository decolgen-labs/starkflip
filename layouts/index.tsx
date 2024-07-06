import React, { PropsWithChildren } from "react";
import BgLeft from "@/public/assets/art/bg-left.svg";
import BgRight from "@/public/assets/art/bg-right.svg";
import { Box, Center, Icon } from "@chakra-ui/react";
const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box position="relative" height="100vh" zIndex={10}>
      <Icon
        as={BgLeft}
        height="100%"
        width="40%"
        position="absolute"
        top={0}
        aria-label="Starknet Coinflip Decolgenlabs"
        left={4}
        right={0}
        display={{ md: "block", base: "none" }}
      />

      <Icon
        as={BgRight}
        height="100%"
        width="40%"
        aria-label="Starknet Coinflip Decolgenlabs  "
        position="absolute"
        top={0}
        right={4}
        display={{ md: "block", base: "none" }}
      />

      <Center
        alignItems="center"
        height="full"
        width="full"
        flexDirection="column"
      >
        {children}
      </Center>
    </Box>
  );
};

export default DefaultLayout;
