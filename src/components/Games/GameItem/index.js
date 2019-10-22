import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../../Session';
import { editGame, deleteGame } from '../../Games/actions';
import * as ROUTES from '../../../constants/routes';

const GameItem = ({ game, onDeleteGame, onEditGame }) => {
  const [name, setName] = useState(game.name);
  const [editMode, setEditMode] = useState(false);

  const onSaveEditText = () => {
    onEditGame(game, name);

    setEditMode(!editMode);
  };

  return (
    <li>
      {!editMode && (
        <span>
          <Link to={`${ROUTES.GAME}/${game.uid}`}>
            <strong>{game.name}</strong>
          </Link>
        </span>
      )}

      <AuthUserContext.Consumer>
        {authUser => (
          <>
            {authUser.uid === game.userId && (
              <span>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      value={name}
                      onChange={event => setName(event.target.value)}
                    />
                    <span>
                      <button onClick={onSaveEditText}>Save</button>
                      <button onClick={() => setEditMode(!editMode)}>
                        Cancel
                      </button>
                    </span>
                  </>
                ) : (
                  <button onClick={() => setEditMode(!editMode)}>
                    Edit
                  </button>
                )}

                {!editMode && (
                  <button
                    type="button"
                    onClick={() => onDeleteGame(game.uid)}
                  >
                    Delete
                  </button>
                )}
              </span>
            )}
          </>
        )}
      </AuthUserContext.Consumer>
    </li>
  );
};

const mapStateToProps = state => {
  return {
    name: state.name,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEditGame: (game, name) => {
      dispatch(editGame(game, name));
    },
    onDeleteGame: id => {
      dispatch(deleteGame(id));
    },
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(GameItem);
