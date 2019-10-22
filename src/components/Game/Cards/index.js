import React, { Component } from 'react';

import { withFirebase } from '../../Firebase';

class Cards extends Component {
  onPlayCard = card => {
    const { game, hand, hands, gameId } = this.props;
    const player =
      hands.length === hand.player ? 1 : Number(hand.player + 1);
    const round =
      hands.length === hand.player
        ? Number(game.round + 1)
        : game.round;

    this.props.firebase.hand(gameId, hand.uid).set({
      ...hand,
      cards: { ...hand.cards, [card]: true },
    });

    this.props.firebase.game(gameId).set({
      ...game,
      player,
      round,
      turn: Number(game.turn + 1),
    });
  };

  render() {
    const { cards, game, hand } = this.props;
    const isCurrentPlayer = game.player === hand.player;

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
                        onClick={() => this.onPlayCard(card)}
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
  }
}

export default withFirebase(Cards);
