import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { CurrentPlayerContext } from '../../../context/CurrentPlayerContext';
import { GameContext } from '../../../context/GameContext';
import { HandContext } from '../../../context/HandContext';
import { HandsContext } from '../../../context/HandsContext';
import { editGame } from '../../Games/actions';
import { editHand } from '../Hand/actions';

export const Cards = ({ onEditGame, onEditHand }) => {
  const { game } = useContext(GameContext);
  const { hand } = useContext(HandContext);
  const { hands } = useContext(HandsContext);
  const { isCurrentPlayer } = useContext(CurrentPlayerContext);
  const cards = hand.cards;

  const onPlayCard = card => {
    const player =
      hands.length === hand.player ? 1 : Number(hand.player + 1);
    const round =
      hands.length === hand.player
        ? Number(game.round + 1)
        : game.round;

    onEditHand(game, {
      ...hand,
      cards: { ...hand.cards, [card]: true },
    });

    onEditGame({
      ...game,
      player,
      round,
      turn: Number(game.turn + 1),
    });
  };

  console.log(isCurrentPlayer);

  return (
    <>
      {cards && (
        <>
          {Object.keys(cards).map(card => {
            return (
              <div key={card}>
                {card} card is
                {cards[card] ? ' played' : ' not played'}
                {!game.betStarted &&
                  isCurrentPlayer(hand) &&
                  cards[card] === false && (
                    <button
                      type="button"
                      onClick={() => onPlayCard(card)}
                    >
                      Play card
                    </button>
                  )}
              </div>
            );
          })}
        </>
      )}

      {!cards && <div>Cards not found ...</div>}
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

export default withConnect(Cards);
