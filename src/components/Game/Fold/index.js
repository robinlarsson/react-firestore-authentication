import React from 'react';
import { useDispatch } from 'react-redux';

import { editGame } from '../../Games/actions';
import { editHand } from '../Hand/actions';
import useGame from '../../../hooks/useGame';

export const Fold = () => {
  const {
    isCurrentPlayer,
    hands,
    hand,
    game,
    setNextPlayer,
  } = useGame();
  const dispatch = useDispatch();

  const onFold = (hand, hands, game) => {
    let players = game.players;
    const iterator = setNextPlayer(hand)[Symbol.iterator](players);
    const player = iterator.next();

    players[player] = true;
    delete players[hand.player];

    const round =
      hands.length === hand.player
        ? Number(game.round + 1)
        : game.round;

    dispatch(
      editHand(game, {
        ...hand,
        hasFolded: true,
      }),
    );

    dispatch(
      editGame({
        ...game,
        player,
        players,
        round,
        turn: Number(game.turn + 1),
      }),
    );
  };

  return (
    <>
      {isCurrentPlayer && game.betStarted > 0 && (
        <span>
          <button onClick={() => onFold(hand, hands, game)}>
            Fold
          </button>
        </span>
      )}
    </>
  );
};

export default Fold;
