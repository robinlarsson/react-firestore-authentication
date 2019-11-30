import React from 'react';
import { useDispatch } from 'react-redux';

import { editGame } from '../../Games/actions';
import { editHand } from '../Hand/actions';
import useGame from '../../../hooks/useGame';

export const Cards = () => {
  const { isCurrentPlayer, hands, hand, game } = useGame();
  const cards = hand.cards;
  const dispatch = useDispatch();

  const onPlayCard = card => {
    const player =
      hands.length === hand.player ? 1 : Number(hand.player + 1);
    const round =
      hands.length === hand.player
        ? Number(game.round + 1)
        : game.round;

    dispatch(
      editHand(game, {
        ...hand,
        cards: { ...hand.cards, [card]: true },
      }),
    );

    dispatch(
      editGame({
        ...game,
        player,
        round,
        turn: Number(game.turn + 1),
      }),
    );
  };

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
                  isCurrentPlayer &&
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

export default Cards;
