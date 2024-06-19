import { HStack, Icon, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

import DiscordIcon from '@/public/assets/social/discord.svg';
import TwitterIcon from '@/public/assets/social/twitter.svg';
const SociaLink = () => {
  const ListSocial = [
    {
      icon: DiscordIcon,
      link: 'https://discord.com/invite/djU2mEJcSq',
      ariaLabel: 'Starknet Coinflip Link Discord"',
    },
    {
      icon: TwitterIcon,
      link: 'https://twitter.com/FaceToSee_',
      ariaLabel: 'Starknet Coinflip Link Twitter"',
    },
  ];
  return (
    <>
      <HStack py={3} px={3} bg="primary.green.200" borderRadius="lg">
        {ListSocial.map(item => (
          <Link
            href={item.link}
            key={item.link}
            target="_blank"
            aria-label={item.ariaLabel}
          >
            <IconButton
              icon={<Icon as={item.icon} height={6} w={6} />}
              aria-label="Starknet Coinflip"
              variant="unstyled"
              cursor="pointer"
              color="white"
              transition="ease-in-out 0.2s"
              _hover={{
                color: 'primary.green.100',
              }}
            />
          </Link>
        ))}
      </HStack>
    </>
  );
};

export default SociaLink;
