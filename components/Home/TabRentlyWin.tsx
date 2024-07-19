import { axiosHandlerNoBearer } from "@/config/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CoinIcon from "@/public/assets/coin/head.svg";
import { Box, Flex, HStack, Icon, Spinner, Text } from "@chakra-ui/react";
import { ellipseMiddle, formatBalance } from "@/utils/formatAddress";
const TabRentlyWin = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recentGames"],
    queryFn: async () => {
      const data: any = await axiosHandlerNoBearer.get(
        "/starkflip/recentGames"
      );
      return data.data;
    },
    refetchInterval: 5000,
  });
  return (
    <Flex flexDirection="column" gap={4}>
      {!isLoading && data ? (
        <>
          {data.map((item: any, index: number) => (
            <HStack
              key={`Recently-${index}`}
              color="rgba(1, 133, 118, 1)"
              fontWeight="bold"
            >
              <Icon as={CoinIcon} />
              <Text>
                {`${ellipseMiddle(item.player, 4, 4)} flipped
               ${parseInt(formatBalance(item.stakedAmount, 18))}`}
              </Text>
              <Text>and got rugged</Text>
            </HStack>
          ))}
        </>
      ) : (
        <>
          <Spinner />
        </>
      )}
    </Flex>
  );
};

export default TabRentlyWin;
