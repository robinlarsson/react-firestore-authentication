import React, { useState } from 'react';

const CurrentPlayerContext = React.createContext();

const CurrentPlayerProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState({});

  const setNextPlayer = hand => {
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

        return {
          next() {
            if (currentPlayerIndex < players.length) {
              currentPlayerIndex = 0;
            }

            console.log(currentPlayerIndex, Object.keys(players));

            return Number(Object.keys(players)[currentPlayerIndex++]);
          },
        };
      },
    };
  };

  const isCurrentPlayer = hand => currentPlayer === hand.player;

  const values = {
    currentPlayer,
    setCurrentPlayer,
    setNextPlayer,
    isCurrentPlayer,
  };

  return (
    <CurrentPlayerContext.Provider value={values}>
      {children}
    </CurrentPlayerContext.Provider>
  );
};

export { CurrentPlayerContext, CurrentPlayerProvider };
