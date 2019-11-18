import {
  GAME_FETCH_SUCCEEDED,
  HANDS_FETCH_SUCCEEDED,
} from './actions';

const initialState = {
  gameLoading: true,
  handLoading: true,
  game: null,
  hands: [],
};

function game(state = initialState, action) {
  switch (action.type) {
    case GAME_FETCH_SUCCEEDED:
      return {
        ...state,
        game: action.game,
        gameLoading: false,
      };
    case HANDS_FETCH_SUCCEEDED:
      return {
        ...state,
        hands: action.hands,
        handLoading: false,
      };
    default:
      return state;
  }
}

export default game;
