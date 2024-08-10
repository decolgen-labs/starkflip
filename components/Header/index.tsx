import { HStack, Icon } from "@chakra-ui/react";
import React from "react";

import LogoIcon from "@/public/assets/logo.svg";
import Link from "next/link";
import Profile from "../Profile/Profile";

interface HeaderProps {
  balance?: string;
  isLoading: boolean;
}
const Header = ({ isLoading, balance }: HeaderProps) => {
  return (
    <HStack
      justifyContent="space-between"
      width="100%"
      zIndex="popover"
      px={{ lg: 24, md: 12, base: 2 }}
      position="absolute"
      top={{ lg: "15%", md: "10%", base: "5%" }}
    >
      <Link href="/">
        <Icon
          cursor="pointer"
          as={LogoIcon}
          width={{ lg: 12, base: 8 }}
          height={{ lg: 12, base: 8 }}
          aria-label="Starkflip Logo"
        />
      </Link>
      <Profile balance={balance} isLoadingBalance={isLoading} />
    </HStack>
  );
};

export default Header;
