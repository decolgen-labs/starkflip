import { useEffect, useState } from 'react';
const Confetti = () => {
  const [windowDimension, setDimension] = useState({
    with: window.innerWidth,
    heigh: window.innerHeight,
  });

  const detectSize = () => {
    setDimension({ with: window.innerWidth, heigh: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDimension]);

  return (
    <>
      {/* <ReacConfetti
        width={windowDimension.with}
        height={windowDimension.heigh}
      /> */}
    </>
  );
};

export default Confetti;
