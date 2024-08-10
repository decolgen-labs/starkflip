import { Box, Text, VStack } from "@chakra-ui/react";

import React, { useEffect, useRef } from "react";

export default function FlipMain({ statusWon, coin, setStatusFlip }: any) {
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
    <VStack textColor={"white"} my={{ lg: 6, base: 3 }} rounded={"lg"}>
      <Box className="container">
        <Box ref={coinRef} id="coin" className="">
          <Box id="heads" className="heads"></Box>
          <Box id="tails" className="tails"></Box>
        </Box>
      </Box>
      <Box display="inline-flex" fontWeight="700" color="white" gap={2}>
        GET READY TO
        <Text color="#0BDD7B">FLIP IT!</Text>
      </Box>
    </VStack>
  );
}
