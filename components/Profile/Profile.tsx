import {
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useBalance, useDisconnect } from "@starknet-react/core";
import React from "react";
import LogoutIcon from "@/public/assets/icons/logout.svg";
import UserIcon from "@/public/assets/icons/user.svg";
import { useDispatch } from "react-redux";

import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { userAddress, disconnectWallet } = useAuth();
  const { isLoading, data } = useBalance({
    address: userAddress ? userAddress : undefined,
    watch: true,
  });
  const { disconnect } = useDisconnect();
  const dispatch = useDispatch();
  return (
    <Menu direction="ltr">
      <MenuButton
        textColor={"black"}
        as={Button}
        bg={"#018576"}
        rounded={"2xl"}
        color={"white"}
        variant={"hover"}
        rightIcon={<LogoutIcon />}
        onClick={async () => {
          await disconnect();
          await disconnectWallet();
        }}
        fontSize={"sm"}
      >
        <HStack>
          <Icon as={UserIcon} w={5} h={5} />
          <Text color={"white"} fontWeight="bold">
            {isLoading ? (
              <Text>
                <Spinner mt={0.5} size={"xs"} />
              </Text>
            ) : (
              <>
                {(parseFloat(data?.value as any) / 1e18).toFixed(6) + " "}
                {data?.symbol}
              </>
            )}
          </Text>
        </HStack>
      </MenuButton>
    </Menu>
  );
}
