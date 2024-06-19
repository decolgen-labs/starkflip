import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';

export default function Loading({ isOpen, onClose }: any) {
  return (
    <Modal
      isCentered
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text color={'black'} textAlign={'center'} fontSize={'xl'}>
            Pending...
          </Text>
          <Flex alignItems={'center'} py={8}>
            <Spinner color="black" mx={'auto'} />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
