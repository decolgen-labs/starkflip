import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { useConnect } from '@starknet-react/core';
import { useDispatch } from 'react-redux';

import ModalConnectWallet from '../Modal/ModalConnectWallet';

import ConnectWalletButton from './ConnectWalletButton';

import wallets from '@/config/wallet';
import { setChainId } from '@/redux/user/user-slice';

const ConnectWallet = ({ onClick, icon, label }: any) => {
  const { connect, connectors, data } = useConnect();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const connectWallet = async (connectorIndex: number) => {
    await connect({ connector: connectors[connectorIndex] });

    await dispatch(setChainId(connectorIndex));
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
            {wallets.map(wallet => (
              <ConnectWalletButton
                key={`connect-${wallet.label}`}
                onClick={async () => {
                  await connectWallet(wallet.index);
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
