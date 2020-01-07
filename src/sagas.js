import { fork } from 'redux-saga/effects';
import gamesSaga from './components/Games/sagas';
import gameSaga from './components/Game/sagas';
import handSaga from './components/Game/CurrentHand/sagas';

function* rootSaga() {
  yield fork(gamesSaga);
  yield fork(gameSaga);
  yield fork(handSaga);
}

export default rootSaga;
