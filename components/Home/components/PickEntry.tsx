import React, { useEffect, useRef } from "react";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import IconStarknet from "@/public/assets/icons/starknet.svg";
const PickEntry = ({
  handleGame,
  setStaked,
  setAmount,
  staked,
  statusWon,
  resetGame,
  statusFlip,
  isFlipping,
}: any) => {
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

  return (
    <Box textColor={"white"} my={{ lg: 6, base: 3 }} rounded={"lg"}>
      <Box className="container">
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
        <Flex gap={4} mt={{ lg: 6, base: 4 }} justifyContent={"center"}>
          <Button
            py={2}
            px={16}
            textColor="#FAFAFA"
            bg="#0BDD7B80"
            _hover={{ borderColor: "#00FFB3" }}
            isLoading={isFlipping}
            borderRadius="24px"
            position="relative"
            border="1px solid transparent"
            bgClip="padding-box"
            zIndex={1}
            _before={{
              content: "''",
              position: "absolute",
              borderRadius: "24px",
              top: "-1px",
              bottom: "-1px",
              left: "-1px",
              right: "-1px",
              bg: "radial-gradient(132.65% 132.65% at 50% 50%, #00FFB3 0%, rgba(0, 255, 179, 0) 100%)",
              zIndex: -2,
            }}
            onClick={statusWon === null ? handleGame : resetGame}
            fontSize={{ md: "1.25rem", base: "md" }}
          >
            {statusWon !== null ? "Play again" : "Flip it!"}
          </Button>
        </Flex>

        {statusWon !== null && !isFlipping && statusFlip && (
          <>
            {statusWon ? (
              <>
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
};

export default PickEntry;
