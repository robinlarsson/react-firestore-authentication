import { put, fork, takeLatest } from 'redux-saga/effects';
import {
  GAME_FETCH_REQUESTED,
  GAME_FETCH_SUCCEEDED,
} from './actions';
import { rsf } from '../Firebase';

export function* syncGame(snapshot) {
  const game = { ...snapshot.data(), uid: snapshot.id };

  yield put({
    type: GAME_FETCH_SUCCEEDED,
    game,
  });
}

export function* syncGameSaga(id) {
  yield fork(rsf.firestore.syncDocument, `game/${id}`, {
    successActionCreator: syncGame,
  });
}

export function* watchGameSaga() {
  yield takeLatest(GAME_FETCH_REQUESTED, syncGameSaga);
}

export default function* gameSagas() {
  yield fork(watchGameSaga);
}
