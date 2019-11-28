import React, { useContext } from 'react';

import GameItem from '../GameItem';
import { GamesContext } from '../../../context/GamesContext';

const GameList = () => {
  const { games } = useContext(GamesContext);
  return (
    <ul>
      {games &&
        Object.values(games).map((game, index) => (
          <GameItem key={index} game={game} />
        ))}
    </ul>
  );
};

export default GameList;
