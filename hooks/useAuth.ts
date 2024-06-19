"use client";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
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
    await connect({ connector: connectors[index] });
    dispatch(setConnector(index));
  };

  const disconnectWallet = () => {
    dispatch(setUserLoading(true));
    disconnect();
    dispatch(logout());
    dispatch(setUserLoading(false));
  };

  return { ...user, disconnectWallet, connectWallet };
};
