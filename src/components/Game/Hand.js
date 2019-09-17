import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

class Hand extends Component {
  onPlayCard = (card, hand) => {
    const { game, hands, gameId } = this.props;

    this.props.firebase.hand(gameId, hand.uid).set({
      ...hand,
      cards: { ...hand.cards, [card]: true },
    });

    const player = hands.length === hand.player ? 1 : hand.player + 1;
    const round =
      hands.length === hand.player ? game.round + 1 : game.round;

    this.props.firebase.game(gameId).set({
      ...game,
      player,
      round,
    });
  };

  render() {
    const { hand, game } = this.props;
    const isCurrentPlayer = game.player === hand.player;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {hand && (
              <>
                <h1>{authUser.email}'s hand</h1>

                {isCurrentPlayer && (
                  <span>
                    <button
                      type="button"
                      onClick={() => this.onBet(authUser)}
                    >
                      Bet
                    </button>
                  </span>
                )}

                {Object.keys(hand.cards).map(card => {
                  return (
                    <div key={card}>
                      {card} card is
                      {hand.cards[card] ? ' played' : ' not played'}
                      {isCurrentPlayer && hand.cards[card] === false && (
                        <button
                          type="button"
                          onClick={() => this.onPlayCard(card, hand)}
                        >
                          Play card
                        </button>
                      )}
                    </div>
                  );
                })}
              </>
            )}

            {!hand && <div>Hand not found ...</div>}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Hand);
