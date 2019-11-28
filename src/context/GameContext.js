import React, { useState } from 'react';

const GameContext = React.createContext();

const GameProvider = ({ children }) => {
  const [game, setGame] = useState({});

  const values = {
    game,
    setGame,
  };

  return (
    <GameContext.Provider value={values}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
