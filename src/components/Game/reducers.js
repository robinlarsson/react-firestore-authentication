import { GAME_FETCH_SUCCEEDED } from './actions';

const initialState = {
  gameLoading: false,
  handLoading: false,
  game: null,
  hands: [],
};

function game(state = initialState, action) {
  switch (action.type) {
    case GAME_FETCH_SUCCEEDED:
      return Object.assign({}, state, {
        game: action.game,
        gameLoading: false,
      });
    default:
      return state;
  }
}

export default game;
