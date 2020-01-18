import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editGame } from '../../Games/actions';
import { GAME_STATUS } from '../../Games/sagas';
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
        bet: Number(bet),
      }),
    );

    dispatch(
      editGame({
        ...game,
        player: getNextPlayer(),
        round: getNextRound(),
        turn: Number(game.turn + 1),
        highestBet: Number(bet),
        status: Number(GAME_STATUS.betting),
      }),
    );
  };

  const bettingIsAllowed = isCurrentPlayer && game.round > 0;
  const totalCardsPlayed = Object.values(game.playedCards).length
    ? Object.values(game.playedCards).reduce(
        (total, playedCardsByPlayer) =>
          total + playedCardsByPlayer.length,
        0,
      )
    : 0;

  return (
    <>
      {bettingIsAllowed && (
        <span>
          <input
            type="number"
            value={bet}
            max={totalCardsPlayed}
            min={game.highestBet + 1}
            onChange={event => setBet(event.target.value)}
          ></input>
          <input
            type="submit"
            value="Bet"
            onClick={() => bet > game.highestBet && onBet()}
          />
        </span>
      )}
    </>
  );
};

export default Bet;
