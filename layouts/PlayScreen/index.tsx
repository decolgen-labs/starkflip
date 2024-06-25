"use client";
import StartGame from "@/components/StartGame";
import { useAuth } from "@/hooks/useAuth";
import { setUserAdress } from "@/redux/user/user-slice";
import { useAccount, useConnect } from "@starknet-react/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const PlayScreen = () => {
  const { userAddress, prevConnector } = useAuth();
  const { connectors, connect } = useConnect();
  const {
    address: addressWallet,
    status: statusWallet,
    account,
  } = useAccount();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleChangeWallet = async () => {
      if (
        addressWallet &&
        addressWallet !== userAddress &&
        prevConnector != null &&
        account
      ) {
        dispatch(setUserAdress(addressWallet));
      } else if (
        addressWallet &&
        account &&
        account.address !== addressWallet &&
        userAddress != null
      ) {
        dispatch(setUserAdress(addressWallet));
      }
    };
    handleChangeWallet();
  }, [addressWallet]);

  useEffect(() => {
    const handleReConenct = async () => {
      if (
        userAddress != null &&
        statusWallet === "disconnected" &&
        prevConnector != null
      ) {
        await connect({ connector: connectors[prevConnector] });
      }
    };
    handleReConenct();
  });

  return <StartGame />;
};

export default PlayScreen;
