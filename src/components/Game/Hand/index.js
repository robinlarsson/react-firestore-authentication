import React, { Component } from 'react';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import Cards from '../Cards';
import Fold from '../Fold';
import Bet from '../Bet';

class Hand extends Component {
  render() {
    const { hand } = this.props;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <>
            <h1>
              Player {hand.player}, {authUser.email}'s hand
            </h1>

            <Bet {...this.props} />
            <Fold {...this.props} />
            <Cards cards={hand.cards} {...this.props} />
          </>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Hand);
