import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';

import { AuthUserContext } from '../../Session';
import { addGame } from '../actions';

const AddGame = ({ onAddGame }) => {
  const authUser = useContext(AuthUserContext);
  const [name, setName] = useState('');

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <button type="submit" onClick={() => onAddGame(name, authUser)}>
        Create game
      </button>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onAddGame: (name, authUser) => {
      dispatch(addGame(name, authUser));
    },
  };
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withConnect(AddGame);
