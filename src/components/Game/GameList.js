import React from 'react';

import GameItem from './GameItem';

const GameList = ({ authUser, games, onEditGame, onRemoveGame }) => (
  <ul>
    {games.map(game => (
      <GameItem
        authUser={authUser}
        key={game.uid}
        game={game}
        onEditGame={onEditGame}
        onRemoveGame={onRemoveGame}
      />
    ))}
  </ul>
);

export default GameList;
