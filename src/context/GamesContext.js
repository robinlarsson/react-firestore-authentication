import React, { useState } from 'react';

const GamesContext = React.createContext();

const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);

  const values = {
    games,
    setGames,
  };

  return (
    <GamesContext.Provider value={values}>
      {children}
    </GamesContext.Provider>
  );
};

export { GamesContext, GamesProvider };
