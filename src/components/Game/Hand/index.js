import React, { useContext } from 'react';

import { AuthUserContext } from '../../Session';
import Cards from '../Cards';
import Fold from '../Fold';
import Bet from '../Bet';
import { HandContext } from '../../../context/HandContext';

export const Hand = () => {
  const authUser = useContext(AuthUserContext);
  const { hand } = useContext(HandContext);

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
