import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { useAccount, useBalance } from '@starknet-react/core';
import React, { useEffect, useRef, useState } from 'react';

import IconETH from '../../public/assets/icons/eth.svg';
import { useAuth } from '../hooks/useAuth';
import Confetti from '../Motion/Confetti';

export default function FlipMain({
  isHeads,
  styles,
  isFlipping,

  setIsFlipping,
  handleGame,
  setStaked,
  setAmount,
  staked,
  statusWon,
  coin,
  resetGame,
  statusFlip,
  setStatusFlip,
}: any) {
  const listItem = [
    {
      value: 0.002,
    },
    {
      value: 0.005,
    },
    {
      value: 0.01,
    },
    {
      value: 0.02,
    },
    {
      value: 0.5,
    },
  ];

  console.log(coin);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const [status, setStatus] = useState<boolean>(false);
  const { isLoading } = useAuth();
  const coinRef = useRef(null);

  const { account, address } = useAccount();

  const {
    isLoading: isLoadingBalance,
    isError,
    error,
    data,
    refetch,
  } = useBalance({
    address,
    watch: true,
  });
  const flipCoin = (result: 'heads' | 'tails') => {
    const coin = coinRef.current as HTMLElement | null;

    coin?.setAttribute('class', '');
    setTimeout(() => {
      coin?.setAttribute('class', `animate-${result}`);
      setTimeout(() => {
        if (result === 'heads') {
          setHeadsCount(headsCount + 1);
        } else {
          setTailsCount(tailsCount + 1);
        }

        setStatusFlip(true);
        refetch();
      }, 3000);
    }, 1000);
  };

  useEffect(() => {
    if (statusWon !== undefined) {
      if (statusWon) {
        flipCoin(coin === 0 ? 'heads' : 'tails');
      } else {
        flipCoin(coin === 1 ? 'heads' : 'tails');
      }
    }
  }, [statusWon, coin]);
  return (
    <Box textColor={'white'} bg={'#1d1d1b99'} my={6} rounded={'lg'}>
      <Box className="container">
        <Box ref={coinRef} id="coin" className="">
          <Box id="heads" className="heads"></Box>
          <Box id="tails" className="tails"></Box>
        </Box>
        <Flex
          bg={'black'}
          mt={6}
          p={1}
          gap={1}
          flexWrap={'wrap'}
          mx={4}
          justifyContent={'space-between'}
          rounded={'2xl'}
        >
          {listItem.map((item: any, index: number) => (
            <Button
              onClick={() => {
                setStaked(index), setAmount(item.value);
              }}
              variant={'hover'}
              cursor={'pointer'}
              bg={index === staked ? '#00FFB3' : 'transparent'}
              py={4}
              px={6}
              rounded={'2xl'}
              textColor={'white'}
              borderColor={'gray.100'}
              key={index}
            >
              <Text
                display={'flex'}
                textColor={'#018576'}
                gap={1}
                alignItems={'center'}
              >
                {item.value} <Icon as={IconETH} />
              </Text>
            </Button>
          ))}
        </Flex>
        <Flex gap={4} mt={6} justifyContent={'center'}>
          <Button
            py={2}
            mt={4}
            px={16}
            textColor={'black'}
            border={'1px'}
            borderColor={'#018576'}
            bg={'#012E3F'}
            _hover={{ borderColor: '#00FFB3', textColor: '#00FFB3' }}
            variant={'hover'}
            isLoading={isLoading}
            color={'#018576'}
            rounded={'2xl'}
            onClick={statusWon === undefined ? handleGame : resetGame}
            fontSize={'1.25rem'}
          >
            {statusWon !== undefined ? 'Play again' : 'Flip it!'}
          </Button>
        </Flex>

        {statusWon !== undefined && !isLoading && statusFlip && (
          <>
            {statusWon ? (
              <>
                <Confetti />
                <Text
                  border={'1px'}
                  borderColor={'green.400'}
                  textColor={'green.400'}
                  px={12}
                  rounded={'xl'}
                  mt={4}
                  py={2}
                >
                  You win
                </Text>
              </>
            ) : (
              <Text
                border={'1px'}
                px={12}
                rounded={'xl'}
                mt={4}
                py={2}
                textColor={'secondary.200'}
                borderColor={'secondary.200'}
              >
                You Lose
              </Text>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
