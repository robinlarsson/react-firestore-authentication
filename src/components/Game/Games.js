import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import GameList from './GameList';

class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      loading: false,
      games: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForGames();
  }

  onListenForGames = () => {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .games()
      .orderBy('createdAt', 'desc')
      .limit(this.state.limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let games = [];
          snapshot.forEach(doc =>
            games.push({ ...doc.data(), uid: doc.id }),
          );

          this.setState({
            games: games.reverse(),
            loading: false,
          });
        } else {
          this.setState({ games: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChangeName = event => {
    this.setState({ name: event.target.value });
  };

  onCreateGame = (event, authUser) => {
    this.props.firebase.games().add({
      name: this.state.name,
      userId: authUser.uid,
      createdAt: this.props.firebase.fieldValue.serverTimestamp(),
      round: 0,
      player: 1,
    });

    this.setState({ name: '' });

    event.preventDefault();
  };

  onEditGame = (game, name) => {
    const { uid, ...gameSnapshot } = game;

    this.props.firebase.game(game.uid).update({
      ...gameSnapshot,
      name,
      editedAt: this.props.firebase.fieldValue.serverTimestamp(),
    });
  };

  onRemoveGame = uid => {
    this.props.firebase.game(uid).delete();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForGames,
    );
  };

  render() {
    const { name, games, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && games && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {games && (
              <GameList
                authUser={authUser}
                games={games}
                onEditGame={this.onEditGame}
                onRemoveGame={this.onRemoveGame}
              />
            )}

            {!games && <div>There are no games ...</div>}

            <form
              onSubmit={event => this.onCreateGame(event, authUser)}
            >
              <input
                type="text"
                value={name}
                onChange={this.onChangeName}
              />
              <button type="submit">Create game</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Games);
