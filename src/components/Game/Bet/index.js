import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editGame } from '../../Games/actions';
import { editHand } from '../CurrentHand/actions';
import useGame from '../../../hooks/useGame';

export const Bet = () => {
  const {
    isCurrentPlayer,
    getNextRound,
    getNextPlayer,
    hand,
    game,
  } = useGame();
  const [bet, setBet] = useState(hand.bet);
  const dispatch = useDispatch();

  const onBet = () => {
    dispatch(
      editHand(game, {
        ...hand,
        bet,
      }),
    );

    dispatch(
      editGame({
        ...game,
        player: getNextPlayer(),
        round: getNextRound(),
        turn: Number(game.turn + 1),
        betStarted: true,
      }),
    );
  };

  const bettingIsAllowed = isCurrentPlayer && game.round > 0;

  return (
    <>
      {bettingIsAllowed && (
        <span>
          <input
            type="number"
            value={bet}
            onChange={event => setBet(event.target.value)}
          ></input>
          <input type="submit" value="Bet" onClick={() => onBet()} />
        </span>
      )}
    </>
  );
};

export default Bet;
