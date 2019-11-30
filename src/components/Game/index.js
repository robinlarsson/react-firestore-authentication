import React from 'react';
import { useDispatch } from 'react-redux';

import { joinGame } from './actions';
import Hands from './Hands';
import useGameLoader from '../../hooks/useGameLoader';

export const Game = ({ match }) => {
  const gameId = match.params.id;
  const { game, hands, authUser, gameLoading } = useGameLoader(
    gameId,
  );
  const dispatch = useDispatch();

  return (
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
              <Hands />
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
                  dispatch(joinGame(gameId, hands, game, authUser))
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
  );
};

export default Game;
