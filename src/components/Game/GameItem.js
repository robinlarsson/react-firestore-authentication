import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

class GameItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editName: this.props.game.name,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editName: this.props.game.name,
    }));
  };

  onChangeEditName = event => {
    this.setState({ editName: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditGame(this.props.game, this.state.editName);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, game, onRemoveGame } = this.props;
    const { editMode, editName } = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editName}
            onChange={this.onChangeEditName}
          />
        ) : (
          <span>
            <Link to={`${ROUTES.GAME}/${game.uid}`}>
              <strong>{game.name}</strong>
            </Link>
          </span>
        )}

        {authUser.uid === game.userId && (
          <span>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEditText}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditMode}>Edit</button>
            )}

            {!editMode && (
              <button
                type="button"
                onClick={() => onRemoveGame(game.uid)}
              >
                Delete
              </button>
            )}
          </span>
        )}
      </li>
    );
  }
}

export default GameItem;
