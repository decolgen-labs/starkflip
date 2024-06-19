import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';

import styles from '../../styles/CoinFlip.module.css';

import FlipHead from './FlipHead';
import FlipMain from './FlipMain';

export default function Flip({
  coin,
  setCoin,
  handleGame,
  setStaked,
  setAmount,
  staked,
  statusWon,
  resetGame,
  refetch,
  statusFlip,
  setStatusFlip,
}: any) {
  const [result, setResult] = useState({ total: 0, heads: 0, tails: 0 });

  const [status, setStatus] = useState('');

  const [isHeads, setIsHeads] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);

  const percentageHeads = (result.heads / result.total) * 100 || 0;
  const percentageTails = (result.tails / result.total) * 100 || 0;

  return (
    <Box>
      {/* <ConfettiExplosion duration={3000} particleCount={200} /> */}

      <Flex flexDirection={'column'}>
        <FlipHead
          percentageHeads={percentageHeads}
          result={result}
          percentageTails={percentageTails}
          coin={coin}
          setCoin={setCoin}
          statusFlip={statusFlip}
          statusWon={statusWon}
        />

        <FlipMain
          isHeads={isHeads}
          styles={styles}
          isFlipping={isFlipping}
          setIsFlipping={setIsFlipping}
          status={status}
          handleGame={handleGame}
          setStaked={setStaked}
          setAmount={setAmount}
          staked={staked}
          coin={coin}
          statusWon={statusWon}
          resetGame={resetGame}
          refetch={refetch}
          statusFlip={statusFlip}
          setStatusFlip={setStatusFlip}
        />
      </Flex>
    </Box>
  );
}
