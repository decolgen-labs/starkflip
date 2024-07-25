import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";

import IconStarknet from "@/public/assets/icons/starknet.svg";
import Confetti from "../Motion/Confetti";
import { useAuth } from "@/hooks/useAuth";

export default function FlipMain({
  handleGame,
  setStaked,
  setAmount,
  staked,
  statusWon,
  coin,
  resetGame,
  statusFlip,
  setStatusFlip,
  isFlipping,
}: any) {
  const listItem = [
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 5,
    },
  ];

  const coinRef = useRef(null);

  const flipCoin = (result: "heads" | "tails") => {
    const coin = coinRef.current as HTMLElement | null;

    coin?.setAttribute("class", "");
    setTimeout(() => {
      coin?.setAttribute("class", `animate-${result}`);
      setTimeout(() => {
        setStatusFlip(true);
      }, 3000);
    }, 1000);
  };

  useEffect(() => {
    if (statusWon !== null) {
      if (statusWon) {
        flipCoin(coin === 0 ? "heads" : "tails");
      } else {
        flipCoin(coin === 1 ? "heads" : "tails");
      }
    }
  }, [statusWon, coin]);
  return (
    <Box
      textColor={"white"}
      bg={"#1d1d1b99"}
      my={{ lg: 6, base: 3 }}
      rounded={"lg"}
    >
      <Box className="container">
        <Box
          ref={coinRef}
          id="coin"
          className=""
          marginY={{
            lg: "2rem",
            base: "0rem",
          }}
          width={{ lg: "15rem", base: "180px" }}
          height={{ lg: "15rem", base: "180px" }}
        >
          <Box id="heads" className="heads"></Box>
          <Box id="tails" className="tails"></Box>
        </Box>
        <Flex
          bg={"black"}
          mt={{ lg: 6, base: 2 }}
          p={1}
          gap={1}
          flexWrap={"wrap"}
          mx={4}
          justifyContent={"space-between"}
          rounded={"2xl"}
        >
          {listItem.map((item: any, index: number) => (
            <Button
              onClick={() => {
                setStaked(index);
                setAmount(item.value);
              }}
              variant={"hover"}
              cursor={"pointer"}
              bg={index === staked ? "#00FFB3" : "transparent"}
              py={4}
              px={6}
              rounded={"2xl"}
              textColor={"white"}
              borderColor={"gray.100"}
              key={index}
            >
              <Text
                display={"flex"}
                textColor={"#018576"}
                gap={1}
                alignItems={"center"}
              >
                {item.value} <Icon as={IconStarknet} />
              </Text>
            </Button>
          ))}
        </Flex>
        <Flex gap={4} mt={{ lg: 6, base: 2 }} justifyContent={"center"}>
          <Button
            py={2}
            mt={4}
            px={16}
            textColor={"black"}
            border={"1px"}
            borderColor={"#018576"}
            bg={"#012E3F"}
            _hover={{ borderColor: "#00FFB3", textColor: "#00FFB3" }}
            variant={"hover"}
            isLoading={isFlipping}
            color={"#018576"}
            rounded={"2xl"}
            onClick={statusWon === null ? handleGame : resetGame}
            fontSize={"1.25rem"}
          >
            {statusWon !== null ? "Play again" : "Flip it!"}
          </Button>
        </Flex>

        {statusWon !== null && !isFlipping && statusFlip && (
          <>
            {statusWon ? (
              <>
                <Confetti />
                <Text
                  border={"1px"}
                  borderColor={"green.400"}
                  textColor={"green.400"}
                  px={12}
                  rounded={"xl"}
                  mt={4}
                  py={2}
                >
                  You win
                </Text>
              </>
            ) : (
              <Text
                border={"1px"}
                px={12}
                rounded={"xl"}
                mt={4}
                py={2}
                textColor={"secondary.200"}
                borderColor={"secondary.200"}
              >
                You Lose
              </Text>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
