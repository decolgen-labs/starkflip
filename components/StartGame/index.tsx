"use client";
import { Box, Icon, Text, VStack } from "@chakra-ui/react";

import ConnectWallet from "../Button/ConnectWallet";

import LogoIcon from "@/public/assets/logo.svg";

import { useAuth } from "@/hooks/useAuth";
import { useBalanceCustom } from "@/hooks/useBalanceCustom";
import React from "react";

import Starked from "../Starked/Starked";
const StartGame = () => {
  const { userAddress } = useAuth();
  const { fetchBalance, balance, isLoading } = useBalanceCustom({
    address: userAddress,
  });
  return (
    <React.Fragment>
      {userAddress ? (
        <>
          <Starked
            balance={balance}
            isLoadingBalance={isLoading}
            fetchBalance={fetchBalance}
          />
        </>
      ) : (
        <>
          <Box
            position={"absolute"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Icon
              as={LogoIcon}
              width={"120px"}
              height="auto"
              mb={10}
              aria-label="Starknet Coinflip Decolgenlabs Logo"
            />
            <ConnectWallet />
          </Box>
          <Box w={"100%"} h={"100%"}>
            <video
              autoPlay
              loop
              muted
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: -1,
              }}
            >
              <source src="/assets/video/technical.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </>
      )}
    </React.Fragment>
  );
};

export default StartGame;
