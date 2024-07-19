import { axiosHandlerNoBearer } from "@/config/axiosConfig";
import { Button, Grid, HStack, Icon, Skeleton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Trophy1 from "@/public/assets/icons/trophy1.svg";
import Trophy2 from "@/public/assets/icons/trophy2.svg";
import Trophy3 from "@/public/assets/icons/trophy3.svg";
import Trophy4 from "@/public/assets/icons/trophy4.svg";
import { Text } from "@chakra-ui/react";
import { ellipseMiddle, formatBalance } from "@/utils/formatAddress";
import Link from "next/link";

const TabTopRank = () => {
  const { data: dataTop, isLoading: isLoadingTop } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const data: any = await axiosHandlerNoBearer.get(
        "/starkflip/leaderboard"
      );
      return data.data;
    },
    refetchInterval: 10000,
  });
  return (
    <>
      <Grid
        gridTemplateColumns="repeat(3,1fr)"
        columnGap={2}
        rowGap={2}
        overflow="auto"
      >
        {
          // @ts-ignore
          !isLoadingTop && dataTop ? (
            <>
              {dataTop.slice(0, 5).map((item: any, index: number) => {
                return (
                  <>
                    <HStack>
                      <Text color="White" fontSize="sm" fontWeight="bold">
                        {item.rank}
                      </Text>
                      {item.rank === 1 && <Icon as={Trophy1} />}
                      {item.rank === 2 && <Icon as={Trophy2} />}
                      {item.rank === 3 && <Icon as={Trophy3} />}
                      {item.rank !== 1 &&
                        item.rank !== 2 &&
                        item.rank !== 3 && <Icon as={Trophy4} />}
                    </HStack>
                    <HStack>
                      <Text color="White" fontSize="sm">
                        {ellipseMiddle(item.player, 6, 6)}
                      </Text>
                    </HStack>

                    <Text color="White" fontSize="sm" textAlign="right">
                      {formatBalance(item.winAmount, 18)}
                    </Text>
                  </>
                );
              })}
            </>
          ) : (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <>
                  <Skeleton fontSize="md">{index + 1}</Skeleton>
                  <Skeleton fontSize="md">
                    {ellipseMiddle("0x000000000000000000000000000", 6, 6)}
                  </Skeleton>
                  <Skeleton fontSize="md">{index + 1}</Skeleton>
                </>
              ))}
            </>
          )
        }
      </Grid>
    </>
  );
};

export default TabTopRank;
