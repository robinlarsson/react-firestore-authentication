import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

class Hand extends Component {
  onPlayCard = (card, hand) => {
    const { gameId } = this.props;

    this.props.firebase.hand(gameId, hand.uid).set({
      ...hand,
      cards: { ...hand.cards, [card]: true },
    });
  };

  render() {
    const { hand } = this.props;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {hand && (
              <>
                <h1>{authUser.email}'s hand</h1>
                <span>
                  <button
                    type="button"
                    onClick={() => this.onBet(authUser)}
                  >
                    Bet
                  </button>
                </span>

                <div>
                  Card: first is{' '}
                  {hand.cards.first ? 'played' : 'not played'}
                  <button
                    type="button"
                    onClick={() => this.onPlayCard('first', hand)}
                  >
                    Play card
                  </button>
                </div>
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
