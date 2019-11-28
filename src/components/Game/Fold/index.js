import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { CurrentPlayerContext } from '../../../context/CurrentPlayerContext';
import { GameContext } from '../../../context/GameContext';
import { HandContext } from '../../../context/HandContext';
import { HandsContext } from '../../../context/HandsContext';
import { editGame } from '../../Games/actions';
import { editHand } from '../Hand/actions';

export const Fold = ({ onEditGame, onEditHand }) => {
  const { game } = useContext(GameContext);
  const { hand } = useContext(HandContext);
  const { hands } = useContext(HandsContext);
  const { isCurrentPlayer } = useContext(CurrentPlayerContext);

  const onFold = (hand, hands, game) => {
    let players = game.players;
    const iterator = this.findNextPlayer(hand)[Symbol.iterator](
      players,
    );
    const player = iterator.next();

    players[player] = true;
    delete players[hand.player];

    const round =
      hands.length === hand.player
        ? Number(game.round + 1)
        : game.round;

    onEditHand(game, {
      ...hand,
      hasFolded: true,
    });

    onEditGame({
      ...game,
      player,
      players,
      round,
      turn: Number(game.turn + 1),
    });
  };

  return (
    <>
      {isCurrentPlayer(hand) && game.betStarted > 0 && (
        <span>
          <button onClick={() => onFold(hand, hands, game)}>
            Fold
          </button>
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

export default withConnect(Fold);
