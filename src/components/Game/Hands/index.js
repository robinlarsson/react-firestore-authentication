import React, { useContext, useEffect } from 'react';

import Hand from '../Hand';
import { AuthUserContext } from '../../Session';
import { HandsContext } from '../../../context/HandsContext';
import { GameContext } from '../../../context/GameContext';
import { HandContext } from '../../../context/HandContext';
import { CurrentPlayerContext } from '../../../context/CurrentPlayerContext';

export const Hands = () => {
  const authUser = useContext(AuthUserContext);
  const { setHand } = useContext(HandContext);
  const { hands } = useContext(HandsContext);
  const { game } = useContext(GameContext);
  const { setCurrentPlayer } = useContext(CurrentPlayerContext);

  useEffect(() => {
    const authUserHand = hands.find(
      hand => hand.userId === authUser.uid,
    );

    setHand(authUserHand);
    if (game) {
      setCurrentPlayer(game.player);
    }
  }, [authUser, setHand, hands, game, setCurrentPlayer]);

  return (
    <div>
      {hands && (
        <>
          <Hand />
          {hands.map(hand => {
            return (
              <div key={hand.uid}>
                Player {hand.player} has played{' '}
                {
                  Object.keys(hand.cards).filter(
                    key => hand.cards[key],
                  ).length
                }{' '}
                cards
                {game.betStarted && (
                  <span> and bet {hand.bet}</span>
                )}{' '}
                {hand.hasFolded ? 'has folded' : 'has not folded'}{' '}
                {game.player === hand.player
                  ? 'currently playing'
                  : 'not playing'}
              </div>
            );
          })}
        </>
      )}

      {!hands && <div>Hands not found ...</div>}
    </div>
  );
};

export default Hands;
