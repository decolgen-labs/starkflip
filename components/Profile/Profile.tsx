import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useContractRead } from "@starknet-react/core";
import React from "react";
import LogoutIcon from "@/public/assets/icons/logout.svg";
import UserIcon from "@/public/assets/icons/user.svg";

import { useAuth } from "@/hooks/useAuth";

import { ABIS } from "@/abis";
import { CONTRACT_ADDRESS } from "@/utils/constants";
import { ellipseMiddle } from "@/utils/formatAddress";

export default function Profile({ balance, isLoadingBalance }: any) {
  const { userAddress, disconnectWallet } = useAuth();

  const { data: dataPoint, isLoading: isLoadingPoint } = useContractRead({
    functionName: "getUserPoint",
    abi: ABIS.pointABI,
    args: [userAddress ? userAddress : ""],
    address: CONTRACT_ADDRESS.USER_POINT,
  });
  return (
    <>
      <Menu variant="profile" matchWidth isOpen={true} onClose={() => {}}>
        <MenuButton>
          <HStack
            color="white"
            bg="#018576"
            padding={4}
            fontWeight="800"
            borderRadius="8px"
            display={{ xl: "flex", md: "none" }}
          >
            <HStack width="fit-content" borderRight="2px solid" pr={2}>
              <Text>Your Point:</Text>
              <Box>
                {!isLoadingPoint ? (
                  dataPoint ? (
                    dataPoint?.toString()
                  ) : (
                    0
                  )
                ) : (
                  <Skeleton>00</Skeleton>
                )}
              </Box>
            </HStack>
            <HStack width="fit-content">
              <Text>STRK:</Text>
              <Box>
                {!isLoadingBalance ? (
                  balance ? (
                    Number(balance).toFixed(3)
                  ) : (
                    "0.00"
                  )
                ) : (
                  <Skeleton>0.00</Skeleton>
                )}
              </Box>
            </HStack>
          </HStack>
        </MenuButton>
        <MenuList
          display={{
            lg: "inherit",
            base: "none",
          }}
        >
          <MenuItem onClick={(e) => e.preventDefault()}>
            <Icon as={UserIcon} h={6} w={6} />
            <Text fontWeight="bold">
              {ellipseMiddle(userAddress || "", 8, 8)}
            </Text>
          </MenuItem>

          <MenuItem isDisabled>History</MenuItem>
          <MenuItem isDisabled>LeaderBoard</MenuItem>

          <MenuDivider />

          <MenuItem
            onClick={async () => {
              await disconnectWallet();
            }}
          >
            <Text fontSize="lg">Logout</Text>
            <Icon as={LogoutIcon} h={6} w={6} />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
