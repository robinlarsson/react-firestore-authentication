import React from 'react';

import Cards from '../Cards';
import useGame from '../../../hooks/useGame';

export const Hands = () => {
  const { game, hands } = useGame();

  return (
    <div>
      {hands && (
        <>
          {hands.map(hand => {
            return (
              <div key={hand.uid}>
                Player {hand.player}
                {game.betStarted && <span> bet {hand.bet}</span>}{' '}
                {hand.hasFolded ? 'has folded' : 'has not folded'}{' '}
                {game.player === hand.player
                  ? 'currently playing'
                  : 'not playing'}
                <Cards hand={hand} />
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
