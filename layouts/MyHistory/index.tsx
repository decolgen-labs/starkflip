"use client";
import Header from "@/components/Header";
import { axiosHandler } from "@/config/axiosConfig";
import { useAuth } from "@/hooks/useAuth";
import { useBalanceCustom } from "@/hooks/useBalanceCustom";
import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MyHistoryPage = () => {
  const { userAddress } = useAuth();
  const { balance, isLoading } = useBalanceCustom({
    address: userAddress,
  });

  return (
    <React.Fragment>
      <Header balance={balance} isLoading={isLoading} />
      <Text>My History</Text>
    </React.Fragment>
  );
};

export default MyHistoryPage;
