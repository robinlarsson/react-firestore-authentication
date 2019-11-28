import {
  call,
  put,
  take,
  fork,
  takeLatest,
} from 'redux-saga/effects';
import {
  GAMES_FETCH_REQUESTED,
  GAMES_FETCH_SUCCEEDED,
  GAMES_FETCH_FAILED,
  ADD_GAME_REQUESTED,
  ADD_GAME_SUCCEEDED,
  ADD_GAME_FAILED,
  EDIT_GAME_REQUESTED,
  EDIT_GAME_SUCCEEDED,
  EDIT_GAME_FAILED,
  DELETE_GAME_REQUESTED,
  DELETE_GAME_SUCCEEDED,
  DELETE_GAME_FAILED,
} from './actions';
import { rsf } from '../Firebase';
import firebase from 'firebase/app';

export function* syncGamesSaga() {
  try {
    const channel = rsf.firestore.channel('game');

    while (true) {
      const snapshot = yield take(channel);

      let games;
      snapshot.forEach(game => {
        games = {
          ...games,
          [game.id]: { ...game.data(), uid: game.id },
        };
      });

      yield put({
        type: GAMES_FETCH_SUCCEEDED,
        games: games ? games : [],
      });
    }
  } catch (e) {
    yield put({ type: GAMES_FETCH_FAILED, message: e.message });
  }
}

export function* addGame({ name, authUser }) {
  try {
    yield call(rsf.firestore.addDocument, 'game', {
      name,
      userId: authUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      round: 0,
      turn: 0,
      player: 1,
      players: {},
    });
    yield put({
      type: ADD_GAME_SUCCEEDED,
    });
  } catch (e) {
    yield put({ type: ADD_GAME_FAILED, message: e.message });
  }
}

export function* editGame({ game }) {
  try {
    yield call(rsf.firestore.setDocument, `game/${game.uid}`, game);
    yield put({
      type: EDIT_GAME_SUCCEEDED,
    });
  } catch (e) {
    yield put({ type: EDIT_GAME_FAILED, message: e.message });
  }
}

export function* deleteGame({ id }) {
  try {
    yield call(rsf.firestore.deleteDocument, `game/${id}`);
    yield put({
      type: DELETE_GAME_SUCCEEDED,
    });
  } catch (e) {
    yield put({ type: DELETE_GAME_FAILED, message: e.message });
  }
}

export function* watchGamesSaga() {
  yield takeLatest(GAMES_FETCH_REQUESTED, syncGamesSaga);
}

export function* watchAddGameSaga() {
  yield takeLatest(ADD_GAME_REQUESTED, addGame);
}

export function* watchEditGameSaga() {
  yield takeLatest(EDIT_GAME_REQUESTED, editGame);
}

export function* watchDeleteGameSaga() {
  yield takeLatest(DELETE_GAME_REQUESTED, deleteGame);
}

export default function* gameSagas() {
  yield fork(watchGamesSaga);
  yield fork(watchAddGameSaga);
  yield fork(watchEditGameSaga);
  yield fork(watchDeleteGameSaga);
}
