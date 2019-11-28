import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';

import { GameContext } from '../../../context/GameContext';
import { HandContext } from '../../../context/HandContext';
import { CurrentPlayerContext } from '../../../context/CurrentPlayerContext';

import { editGame } from '../../Games/actions';
import { editHand } from '../Hand/actions';
import { HandsContext } from '../../../context/HandsContext';

export const Bet = ({ onEditGame, onEditHand }) => {
  const { game } = useContext(GameContext);
  const { hand } = useContext(HandContext);
  const { hands } = useContext(HandsContext);
  const { isCurrentPlayer } = useContext(CurrentPlayerContext);
  const [bet, setBet] = useState(hand.bet);

  const onBet = event => {
    const player =
      hands.length === hand.player ? 1 : Number(hand.player + 1);
    const round =
      hands.length === hand.player
        ? Number(game.round + 1)
        : game.round;

    onEditHand({
      ...hand,
      bet,
    });

    onEditGame({
      ...game,
      player,
      round,
      turn: Number(game.turn + 1),
      betStarted: true,
    });

    event.preventDefault();
  };

  return (
    <>
      {isCurrentPlayer(hand) && game.round > 0 && (
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

const mapDispatchToProps = dispatch => {
  return {
    onEditGame: game => {
      dispatch(editGame(game));
    },
    onEditHand: (game, hand) => {
      dispatch(editHand(game, hand));
    },
  };
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withConnect(Bet);
