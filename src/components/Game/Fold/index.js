import React from 'react';
import { useDispatch } from 'react-redux';

import { editGame } from '../../Games/actions';
import { editHand } from '../CurrentHand/actions';
import useGame from '../../../hooks/useGame';

export const Fold = () => {
  const {
    isCurrentPlayer,
    hand,
    game,
    getNextPlayer,
    getNextRound,
  } = useGame();
  const dispatch = useDispatch();

  const onFold = () => {
    const nextPlayer = getNextPlayer();

    dispatch(
      editHand(game, {
        ...hand,
        hasFolded: true,
      }),
    );

    dispatch(
      editGame({
        ...game,
        player: nextPlayer,
        round: getNextRound(),
        turn: Number(game.turn + 1),
      }),
    );
  };

  return (
    <>
      {isCurrentPlayer && (
        <span>
          <button onClick={() => onFold()}>Fold</button>
        </span>
      )}
    </>
  );
};

export default Fold;
