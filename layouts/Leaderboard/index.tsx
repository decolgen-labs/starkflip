"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, HStack, Icon, Skeleton, Text } from "@chakra-ui/react";
import { axiosHandlerNoBearer } from "@/config/axiosConfig";
import { ellipseMiddle, formatBalance } from "@/utils/formatAddress";
import Trophy1 from "@/public/assets/icons/trophy1.svg";
import Trophy2 from "@/public/assets/icons/trophy2.svg";
import Trophy3 from "@/public/assets/icons/trophy3.svg";
import Trophy4 from "@/public/assets/icons/trophy4.svg";
import CopyClipBoard from "@/components/CopyClipBoard/CopyClipBoard";
import IconStrk from "@/public/assets/icons/starknet.svg";
import { useAuth } from "@/hooks/useAuth";
import { useBalanceCustom } from "@/hooks/useBalanceCustom";
import Header from "@/components/Header";
const LeaderboardPage = () => {
  const [dataTop, setDataTop] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data: any = await axiosHandlerNoBearer.get(
        "/starkflip/leaderboard"
      );

      setDataTop(data.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  const ListHedaer = [
    "Rank",
    "Address",
    "(Win/Lose)",
    <HStack gap={1}>
      <Text>Win Amount</Text>
      <Icon as={IconStrk} />
    </HStack>,
    "Total Flipped",
  ];
  const { userAddress } = useAuth();
  const { balance, isLoading } = useBalanceCustom({
    address: userAddress,
  });
  return (
    <React.Fragment>
      <Header balance={balance} isLoading={isLoading} />
      <Text
        color="#0BDD7B"
        fontSize="4xl"
        textShadow="#0BDD7B 0px 4px 40px"
        fontWeight="bold"
      >
        Leaderboard
      </Text>
      <Text color="#018576" fontWeight="bold" mb={4}>
        Flip, flip more to get better rank!
      </Text>

      <Box
        background=" #01857633"
        border="1px solid"
        borderColor="#018576"
        padding={3}
        borderRadius="8px"
      >
        <Grid
          gridTemplateColumns="repeat(5,1fr)"
          columnGap={4}
          rowGap={2}
          overflow="auto"
        >
          {ListHedaer.map((item, index) => (
            <Text
              fontWeight="bold"
              fontSize="xl"
              color="White"
              key={`${item}-${index}`}
            >
              {item}
            </Text>
          ))}
          {
            // @ts-ignore
            !loading && dataTop ? (
              <>
                {dataTop.map((item: any, index: number) => {
                  return (
                    <>
                      <HStack>
                        <Text color="White" fontSize="md" fontWeight="bold">
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
                        <Text color="White" fontSize="md">
                          {ellipseMiddle(item.player, 6, 6)}
                        </Text>
                        <CopyClipBoard
                          context={item.player}
                          aria-label="Content Player"
                        />
                      </HStack>

                      <HStack justifyContent="center">
                        <Text color="#0BDD7B" fontSize="md">
                          {item.wins}/
                        </Text>

                        <Text color="red" fontSize="md">
                          {item.losses}
                        </Text>
                      </HStack>

                      <Text color="White" fontSize="md" textAlign="right">
                        {formatBalance(item.winAmount, 18)}
                      </Text>

                      <Text color="White" fontSize="md" textAlign="right">
                        {item.totalFlipped}
                      </Text>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {Array.from({ length: 10 }).map((_, index) => (
                  <>
                    <Skeleton fontSize="md">{index + 1}</Skeleton>
                    <Skeleton fontSize="md">
                      {ellipseMiddle("0x000000000000000000000000000", 6, 6)}
                    </Skeleton>
                    <Skeleton fontSize="md">{index + 1}</Skeleton>
                    <Skeleton fontSize="md">{index + 1}</Skeleton>
                    <Skeleton fontSize="md">{index + 1}</Skeleton>
                  </>
                ))}
              </>
            )
          }{" "}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default LeaderboardPage;
