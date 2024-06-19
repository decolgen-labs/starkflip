import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useConnect } from "@starknet-react/core";

import ModalConnectWallet from "../Modal/ModalConnectWallet";

import ConnectWalletButton from "./ConnectWalletButton";

import wallets from "@/config/wallet";
import { useAuth } from "@/hooks/useAuth";

const ConnectWallet = ({ onClick, icon, label }: any) => {
  const { connect, connectors, data } = useConnect();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { connectWallet } = useAuth();
  const handleConnectWallet = async (connectorIndex: number) => {
    await connect({ connector: connectors[connectorIndex] });
    await connectWallet(connectorIndex);
    onClose();
  };

  return (
    <>
      <Box>
        <Button
          key={`connect1-btn}`}
          variant="primary"
          onClick={() => {
            onOpen();
          }}
        >
          Connect Wallet
        </Button>

        <ModalConnectWallet isOpen={isOpen} onClose={onClose}>
          <Box px={2} pb={4}>
            {wallets.map((wallet) => (
              <ConnectWalletButton
                key={`connect-${wallet.label}`}
                onClick={async () => {
                  await handleConnectWallet(wallet.index);
                }}
                icon={wallet.icon}
                label={wallet.label}
              />
            ))}
          </Box>
        </ModalConnectWallet>
      </Box>
    </>
  );
};

export default ConnectWallet;
