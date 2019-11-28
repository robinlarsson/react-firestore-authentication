import React, { useState } from 'react';

const HandContext = React.createContext();

const HandProvider = ({ children }) => {
  const [hand, setHand] = useState({});

  const values = {
    hand,
    setHand,
  };

  return (
    <HandContext.Provider value={values}>
      {children}
    </HandContext.Provider>
  );
};

export { HandContext, HandProvider };
