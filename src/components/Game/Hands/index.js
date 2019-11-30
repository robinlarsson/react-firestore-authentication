import React from 'react';

import Hand from '../Hand';
import useGame from '../../../hooks/useGame';

export const Hands = () => {
  const { game, hands } = useGame();

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
