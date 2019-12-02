import { call, put, fork, takeLatest } from 'redux-saga/effects';
import {
  GAME_FETCH_REQUESTED,
  GAME_FETCH_SUCCEEDED,
  HANDS_FETCH_SUCCEEDED,
  HANDS_FETCH_REQUESTED,
  JOIN_GAME_REQUESTED,
  JOIN_GAME_SUCCEEDED,
  JOIN_GAME_FAILED,
  SYNC_GAME_REQUESTED,
  SYNC_GAME_FAILED,
  SYNC_HANDS_REQUESTED,
  SYNC_HANDS_FAILED,
  syncGame,
  syncGameError,
  syncHands,
  syncHandsError,
} from './actions';
import { rsf } from '../Firebase';

export function* joinGame({ id, hands, game, authUser }) {
  try {
    const player = Number(hands.length + 1);

    yield call(rsf.firestore.addDocument, `game/${id}/hands`, {
      bet: 0,
      cards: {
        1: false,
        2: false,
        3: false,
        4: false,
      },
      hasWon: false,
      hasFolded: false,
      userId: authUser.uid,
      player,
    });
    yield put({
      type: JOIN_GAME_SUCCEEDED,
    });
  } catch (e) {
    yield put({ type: JOIN_GAME_FAILED, message: e.message });
  }
}

export function* watchJoinGameSaga() {
  yield takeLatest(JOIN_GAME_REQUESTED, joinGame);
}

export function* syncGameFromSnapshot(action) {
  const { snapshot } = action;
  const game = { ...snapshot.data(), uid: snapshot.id };

  yield put({
    type: GAME_FETCH_SUCCEEDED,
    game,
  });
}

export function* watchSyncGameSaga() {
  yield takeLatest(SYNC_GAME_REQUESTED, syncGameFromSnapshot);
}

export function syncGameFailed(snapshot) {
  console.log(snapshot);
}

export function* watchSyncGameErrorSaga() {
  yield takeLatest(SYNC_GAME_FAILED, syncGameFailed);
}

export function* syncGameDocumentSaga(action) {
  yield fork(rsf.firestore.syncDocument, `game/${action.id}`, {
    successActionCreator: syncGame,
    failureActionCreator: syncGameError,
  });
}

export function* watchGameSaga() {
  yield takeLatest(GAME_FETCH_REQUESTED, syncGameDocumentSaga);
}

export function* syncHandsFromSnapshot(action) {
  const { snapshot } = action;
  const hands = [];

  snapshot.forEach(doc => hands.push({ ...doc.data(), uid: doc.id }));

  yield put({
    type: HANDS_FETCH_SUCCEEDED,
    hands,
  });
}

export function* watchSyncHandsSaga() {
  yield takeLatest(SYNC_HANDS_REQUESTED, syncHandsFromSnapshot);
}

export function syncHandsFailed(snapshot) {
  console.log(snapshot);
}

export function* watchSyncHandsErrorSaga() {
  yield takeLatest(SYNC_HANDS_FAILED, syncHandsFailed);
}

export function* syncHandsSaga(action) {
  yield fork(
    rsf.firestore.syncCollection,
    `game/${action.id}/hands`,
    {
      successActionCreator: syncHands,
      failureActionCreator: syncHandsError,
    },
  );
}

export function* watchHandsSaga() {
  yield takeLatest(HANDS_FETCH_REQUESTED, syncHandsSaga);
}

export default function* gameSagas() {
  yield fork(watchGameSaga);
  yield fork(watchHandsSaga);
  yield fork(watchJoinGameSaga);
  yield fork(watchSyncGameSaga);
  yield fork(watchSyncGameErrorSaga);
  yield fork(watchSyncHandsSaga);
  yield fork(watchSyncHandsErrorSaga);
}
