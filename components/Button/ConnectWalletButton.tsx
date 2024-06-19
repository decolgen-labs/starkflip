import { Flex, Icon, Text } from '@chakra-ui/react';

const ConnectWalletButton = ({ onClick, icon, label }: any) => (
  <Flex
    py={3}
    alignItems={'center'}
    rounded={'lg'}
    gap={{ md: 4, base: 3 }}
    cursor={'pointer'}
    _hover={{
      bg: 'primary.green.300',
    }}
    onClick={onClick}
    px={8}
  >
    <Icon as={icon} fontSize={'2xl'} />
    <Text fontSize={'lg'} textColor="white">
      {label}
    </Text>
  </Flex>
);

export default ConnectWalletButton;
