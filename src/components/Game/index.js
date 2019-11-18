import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchGame, fetchHands, joinGame } from './actions';
import { AuthUserContext } from '../Session';
import Hands from './Hands';

export const Game = ({
  match,
  game,
  hands,
  gameLoading,
  onFetchGame,
  onFetchHands,
  onJoinGame,
}) => {
  const gameId = match.params.id;

  useEffect(() => {
    onFetchGame(gameId);
    onFetchHands(gameId);
  }, [onFetchGame, onFetchHands, gameId]);

  console.log(game, hands, gameLoading);
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          {gameLoading && <div>Loading ...</div>}

          {game && (
            <>
              <h1>{game.name}</h1>

              {hands && (
                <>
                  <span>Players: {hands.length}</span>
                  <div>Round: {game.round}</div>
                  <div>
                    Status: {game.betStarted ? 'betting' : 'playing'}
                  </div>
                  <Hands hands={hands} game={game} gameId={gameId} />
                </>
              )}

              {hands === null ||
              (hands &&
                hands.filter(hand => hand.userId === authUser.uid)
                  .length === 0 &&
                game.turn === 0) ? (
                <span>
                  <button
                    type="button"
                    onClick={() =>
                      onJoinGame(gameId, hands, game, authUser)
                    }
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
};

const mapStateToProps = state => {
  return {
    game: state.game.game,
    gameLoading: state.game.gameLoading,
    hands: state.game.hands,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchGame: id => {
      dispatch(fetchGame(id));
    },
    onFetchHands: id => {
      dispatch(fetchHands(id));
    },
    onJoinGame: (id, hands, game, authUser) => {
      dispatch(joinGame(id, hands, game, authUser));
    },
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(Game);
