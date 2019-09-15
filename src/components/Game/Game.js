import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import Hands from './Hands';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameLoading: false,
      handLoading: false,
      game: null,
      hands: null,
    };
  }

  componentDidMount() {
    this.onListenForGame();
    this.onListenForHands();
  }

  onListenForGame = () => {
    const gameId = this.props.match.params.id;
    this.setState({ gameLoading: true });

    this.gameUnsubscribe = this.props.firebase
      .game(gameId)
      .onSnapshot(snapshot => {
        this.setState({
          game: snapshot.data(),
          gameLoading: false,
        });
      });
  };

  onListenForHands = () => {
    const gameId = this.props.match.params.id;
    this.setState({ handLoading: true });

    this.handUnsubscribe = this.props.firebase
      .hands(gameId)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let hands = [];
          snapshot.forEach(doc =>
            hands.push({ ...doc.data(), uid: doc.id }),
          );

          this.setState({
            hands: hands.reverse(),
            handLoading: false,
          });
        } else {
          this.setState({ hands: null, handLoading: false });
        }
      });
  };

  componentWillUnmount() {
    this.gameUnsubscribe && this.gameUnsubscribe();
    this.handUnsubscribe && this.handUnsubscribe();
  }

  onJoinGame = (game, authUser) => {
    const gameId = this.props.match.params.id;

    this.props.firebase.hands(gameId).add({
      bet: 0,
      cards: {
        first: false,
        second: false,
        third: false,
        forth: false,
      },
      hasWon: false,
      userId: authUser.uid,
    });
  };

  render() {
    const gameId = this.props.match.params.id;
    const { game, hands, gameLoading, handLoading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {gameLoading && <div>Loading ...</div>}

            {game && (
              <>
                <h1>{game.name}</h1>

                {handLoading && <div>Loading ...</div>}

                {hands && <Hands hands={hands} gameId={gameId} />}

                {hands === null ||
                (hands &&
                  hands.filter(hand => hand.userId === authUser.uid)
                    .length === 0) ? (
                  <span>
                    <button
                      type="button"
                      onClick={() => this.onJoinGame(game, authUser)}
                    >
                      Join game
                    </button>
                  </span>
                ) : (
                  ''
                )}
              </>
            )}

            {!game && <div>Game not found ...</div>}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Game);
