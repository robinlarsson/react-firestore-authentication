import { fork } from 'redux-saga/effects';
import gamesSaga from './components/Games/sagas';
import gameSaga from './components/Game/sagas';

function* rootSaga() {
  yield fork(gamesSaga);
  yield fork(gameSaga);
}

export default rootSaga;
