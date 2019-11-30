import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editGame } from '../../Games/actions';
import { editHand } from '../Hand/actions';
import useGame from '../../../hooks/useGame';

export const Bet = () => {
  const { isCurrentPlayer, hands, hand, game } = useGame();
  const [bet, setBet] = useState(hand.bet);
  const dispatch = useDispatch();

  const onBet = event => {
    const player =
      hands.length === hand.player ? 1 : Number(hand.player + 1);
    const round =
      hands.length === hand.player
        ? Number(game.round + 1)
        : game.round;

    dispatch(
      editHand({
        ...hand,
        bet,
      }),
    );

    dispatch(
      editGame({
        ...game,
        player,
        round,
        turn: Number(game.turn + 1),
        betStarted: true,
      }),
    );

    event.preventDefault();
  };

  return (
    <>
      {isCurrentPlayer && game.round > 0 && (
        <span>
          <form onSubmit={onBet}>
            <input
              type="number"
              value={bet}
              onChange={event => setBet(event.target.value)}
            ></input>
            <input type="submit" value="Bet" />
          </form>
        </span>
      )}
    </>
  );
};

export default Bet;
