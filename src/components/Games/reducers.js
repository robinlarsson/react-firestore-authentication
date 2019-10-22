import {
  GAMES_FETCH_SUCCEEDED,
  ADD_GAME_SUCCEEDED,
  ADD_GAME_FAILED,
  EDIT_GAME_SUCCEEDED,
  DELETE_GAME_SUCCEEDED,
} from './actions';

const initialState = {
  name: '',
  loading: true,
  games: [],
};

function games(state = initialState, action) {
  let games = [];
  switch (action.type) {
    case GAMES_FETCH_SUCCEEDED:
      return Object.assign({}, state, {
        games: action.games,
        loading: false,
      });
    case ADD_GAME_SUCCEEDED:
      return Object.assign({}, state, {
        name: '',
      });
    case ADD_GAME_FAILED:
      return Object.assign({}, state, {
        name: '',
        message: action.message,
      });
    case EDIT_GAME_SUCCEEDED:
      return state;
    case DELETE_GAME_SUCCEEDED:
      games = state.games.filter(game => {
        return game.id !== action.id;
      });

      return Object.assign({}, state, {
        games,
      });
    default:
      return state;
  }
}

export default games;
