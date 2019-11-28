import React, { useState } from 'react';

const HandsContext = React.createContext();

const HandsProvider = ({ children }) => {
  const [hands, setHands] = useState([]);

  const values = {
    hands,
    setHands,
  };

  return (
    <HandsContext.Provider value={values}>
      {children}
    </HandsContext.Provider>
  );
};

export { HandsContext, HandsProvider };
