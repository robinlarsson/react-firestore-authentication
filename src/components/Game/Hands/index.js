import React, { Component } from 'react';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import Hand from '../Hand';

class Hands extends Component {
  render() {
    const { hands, game } = this.props;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {hands && (
              <>
                {hands.map(hand => {
                  return (
                    <div key={hand.uid}>
                      Player {hand.player} has played{' '}
                      {
                        Object.keys(hand.cards).filter(
                          key => hand.cards[key],
                        ).length
                      }{' '}
                      cards
                      {game.betStarted && (
                        <span> and bet {hand.bet}</span>
                      )}{' '}
                      {hand.hasFolded
                        ? 'has folded'
                        : 'has not folded'}{' '}
                      {game.player === hand.player
                        ? 'currently playing'
                        : 'not playing'}
                      {hand.userId === authUser.uid && (
                        <Hand hand={hand} {...this.props} />
                      )}
                    </div>
                  );
                })}
              </>
            )}

            {!hands && <div>Hands not found ...</div>}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Hands);
