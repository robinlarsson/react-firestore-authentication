import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import Hand from './Hand';

class Hands extends Component {
  render() {
    const { hands, game, gameId } = this.props;

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
                      {hand.userId === authUser.uid && (
                        <Hand
                          hand={hand}
                          hands={hands}
                          game={game}
                          gameId={gameId}
                        />
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
