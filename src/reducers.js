import { combineReducers } from 'redux';

import games from './components/Games/reducers';
import game from './components/Game/reducers';

export default combineReducers({
  games,
  game,
});
