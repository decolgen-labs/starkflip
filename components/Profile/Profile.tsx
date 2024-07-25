import {
  Box,
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
import Link from "next/link";

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
      <Menu variant="profile" matchWidth>
        <MenuButton>
          <HStack
            color="white"
            bg="#0BDD7B33"
            border="2px solid"
            borderColor="#0BDD7B"
            padding={{ lg: 4, base: 2 }}
            gap={0}
            fontWeight="800"
            borderRadius="8px"
          >
            <HStack
              width="fit-content"
              borderRight={{ lg: "2px solid", base: "none" }}
              pr={2}
              borderRightColor="#0BDD7B"
            >
              <Text
                fontSize={{
                  lg: "normal",
                  base: "sm",
                }}
              >
                Your Point:
              </Text>
              <Box>
                {!isLoadingPoint ? (
                  dataPoint ? (
                    <Text
                      fontSize={{
                        lg: "normal",
                        base: "sm",
                      }}
                    >
                      {dataPoint?.toString()}
                    </Text>
                  ) : (
                    0
                  )
                ) : (
                  <Skeleton>00</Skeleton>
                )}
              </Box>
            </HStack>
            <HStack
              width="fit-content"
              display={{
                lg: "flex",
                base: "none",
              }}
            >
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
        <MenuList bg={{ lg: "#0BDD7B33", base: "rgba(1, 133, 118, 1)" }}>
          <MenuItem
            onClick={(e) => e.preventDefault()}
            display={{
              lg: "flex",
              base: "block",
            }}
            textAlign="center"
          >
            <Icon as={UserIcon} h={{ lg: 6, base: 5 }} w={{ lg: 6, base: 5 }} />
            <Text fontWeight="bold">
              {ellipseMiddle(userAddress || "", 6, 6)}
            </Text>
          </MenuItem>
          {/* <Link href="/my-history">
            <MenuItem fontWeight="bold">MyHistory</MenuItem>
          </Link> */}
          <Link href="/leaderboard">
            <MenuItem fontWeight="bold">LeaderBoard</MenuItem>
          </Link>

          <MenuDivider />

          <MenuItem
            onClick={async () => {
              await disconnectWallet();
            }}
          >
            <Text>Logout</Text>
            <Icon as={LogoutIcon} h={6} w={6} />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
