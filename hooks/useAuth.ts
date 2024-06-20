"use client";
import { useConnect, useDisconnect } from "@starknet-react/core";
import { useTypedSelector } from "./useTypedSelector";

import { useDispatch } from "react-redux";
import { logout, setConnector, setUserLoading } from "@/redux/user/user-slice";

import { useToast } from "@chakra-ui/react";

export const useAuth = () => {
  const user = useTypedSelector((state) => state.user);

  const { connect, connectors } = useConnect();
  const dispatch = useDispatch();
  const { disconnect } = useDisconnect();
  const toast = useToast({
    position: "top-right",
  });

  const connectWallet = async (index: number) => {
    try {
      dispatch(setUserLoading(true));
      await connect({ connector: connectors[index] });
      dispatch(setConnector(index));
      dispatch(setUserLoading(false));
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while connecting wallet",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const disconnectWallet = () => {
    dispatch(setUserLoading(true));
    disconnect();
    dispatch(logout());
    dispatch(setUserLoading(false));
  };
  const handleFlipping = async () => {};
  return { ...user, disconnectWallet, connectWallet };
};
