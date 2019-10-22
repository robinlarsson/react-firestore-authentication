import React, { Component } from 'react';

import { withFirebase } from '../../Firebase';

class Fold extends Component {
  onFold = () => {
    const { hand, hands, game, gameId } = this.props;
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

    this.props.firebase.hand(gameId, hand.uid).set({
      ...hand,
      hasFolded: true,
    });

    this.props.firebase.game(gameId).set({
      ...game,
      player,
      players,
      round,
      turn: Number(game.turn + 1),
    });
  };

  findNextPlayer = hand => {
    return {
      [Symbol.iterator](players) {
        console.log(hand, players);
        let currentPlayerIndex = 0;

        Object.keys(players).forEach((key, index) => {
          console.log(key, index);
          if (key === hand.player) {
            currentPlayerIndex = index;
          }
        });

        console.log(currentPlayerIndex);

        return {
          next() {
            const doNothaveMorePlayers = !(
              currentPlayerIndex < players.length
            );

            if (doNothaveMorePlayers) {
              currentPlayerIndex = 0;
            }

            console.log(currentPlayerIndex, Object.keys(players));

            return Number(Object.keys(players)[currentPlayerIndex++]);
          },
        };
      },
    };
  };

  render() {
    const { hand, game } = this.props;
    const isCurrentPlayer = game.player === hand.player;

    return (
      <>
        {isCurrentPlayer && game.betStarted > 0 && (
          <span>
            <button onClick={() => this.onFold()}>Fold</button>
          </span>
        )}
      </>
    );
  }
}

export default withFirebase(Fold);
