import {
  Button,
  HStack,
  Menu,
  MenuButton,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useBalance, useDisconnect } from '@starknet-react/core';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import { useAuth } from '../hooks/useAuth';

import { removeUserFromStorage } from '@/redux/user/user-helper';
import { setChainId, setUser, setUserLoading } from '@/redux/user/user-slice';

export default function Profile() {
  const { user } = useAuth();
  const { isLoading, data } = useBalance({
    address: user ? user : undefined,
    watch: true,
  });
  const { disconnect } = useDisconnect();
  const dispatch = useDispatch();
  return (
    <Menu direction="ltr">
      <MenuButton
        textColor={'black'}
        as={Button}
        bg={'#018576'}
        rounded={'2xl'}
        color={'white'}
        variant={'hover'}
        rightIcon={<MdLogout />}
        onClick={async () => {
          await dispatch(setUserLoading(true));
          removeUserFromStorage();
          await dispatch(setUser(null));
          await dispatch(setChainId(null));
          await disconnect();
          dispatch(setUserLoading(false));
        }}
        fontSize={'sm'}
      >
        <HStack>
          <FaUserCircle />
          <Text color={'white'} fontWeight="bold">
            {isLoading ? (
              <Text>
                <Spinner mt={0.5} size={'xs'} />
              </Text>
            ) : (
              <>
                {(parseFloat(data?.value as any) / 1e18).toFixed(6) + ' '}
                {data?.symbol}
              </>
            )}
          </Text>
        </HStack>
      </MenuButton>

      {/* <MenuList p={0} width="full">
        <MenuItem
          onClick={async () => {
            await dispatch(setUserLoading(true));
            removeUserFromStorage();
            await dispatch(setUser(undefined));
            await disconnect();
            dispatch(setUserLoading(false));
          }}
          fontSize={'sm'}
        >
          <Text>Log out</Text>
        </MenuItem>
      </MenuList> */}
    </Menu>
  );
}
