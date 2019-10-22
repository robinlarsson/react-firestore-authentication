import React, { Component } from 'react';

import { withFirebase } from '../../Firebase';

class Bet extends Component {
  state = {
    bet: 0,
  };

  onBet = event => {
    const { hand, hands, game, gameId } = this.props;
    const { bet } = this.state;
    const player =
      hands.length === hand.player ? 1 : Number(hand.player + 1);
    const round =
      hands.length === hand.player
        ? Number(game.round + 1)
        : game.round;

    this.props.firebase.hand(gameId, hand.uid).set({
      ...hand,
      bet,
    });

    this.props.firebase.game(gameId).set({
      ...game,
      player,
      round,
      turn: Number(game.turn + 1),
      betStarted: true,
    });

    event.preventDefault();
  };

  handleChangeBet = event => {
    this.setState({ bet: event.target.value });
  };

  render() {
    const { hand, game } = this.props;
    const { bet } = this.state;
    const isCurrentPlayer = game.player === hand.player;

    return (
      <>
        {isCurrentPlayer && game.round > 0 && (
          <span>
            <form onSubmit={this.onBet}>
              <input
                type="number"
                value={bet}
                onChange={this.handleChangeBet}
              ></input>
              <input type="submit" value="Bet" />
            </form>
          </span>
        )}
      </>
    );
  }
}

export default withFirebase(Bet);
