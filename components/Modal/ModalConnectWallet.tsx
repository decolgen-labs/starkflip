import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
export default function ModalConnectWallet({ isOpen, onClose, children }: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={'#012E3F'} borderRadius="lg">
        <ModalHeader
          textColor={'white'}
          textAlign={'center'}
          py={8}
          fontWeight="extrabold"
          fontSize="2xl"
        >
          Connect Wallet
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody padding={0}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
