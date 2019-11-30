import React from 'react';

import Cards from '../Cards';
import Fold from '../Fold';
import Bet from '../Bet';
import useGame from '../../../hooks/useGame';

export const Hand = () => {
  const { hand, authUser } = useGame();

  return (
    <>
      {hand && (
        <>
          <h1>
            Player {hand.player}, {authUser.email}'s hand
          </h1>

          <Bet />
          <Fold />
          <Cards />
        </>
      )}
    </>
  );
};

export default Hand;
