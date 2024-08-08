import { axiosHandlerNoBearer } from "@/config/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CoinIcon from "@/public/assets/coin/head.svg";
import { Box, Flex, HStack, Icon, Spinner, Text } from "@chakra-ui/react";
import { ellipseMiddle, formatBalance } from "@/utils/formatAddress";
import { timeAgo } from "@/utils/timeFormat";

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
              <Text color="white">
                {`${ellipseMiddle(item.player, 4, 4)} `}
              </Text>
              <Text>{`flipped
               ${parseInt(
                 formatBalance(item.stakedAmount, 18)
               )} and got lucky`}</Text>
              <Text color="#D4D4D8" fontSize="12px" fontWeight="normal" ml={8}>
                {item.updatedAt && timeAgo(item.updatedAt.toString())}
              </Text>
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
