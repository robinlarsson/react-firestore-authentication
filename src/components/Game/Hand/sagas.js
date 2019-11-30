import { call, put, fork, takeLatest } from 'redux-saga/effects';
import {
  EDIT_HAND_REQUESTED,
  EDIT_HAND_SUCCEEDED,
  EDIT_HAND_FAILED,
} from './actions';
import { rsf } from '../../Firebase';

export function* editHand({ game, hand }) {
  try {
    yield call(
      rsf.firestore.setDocument,
      `game/${game.uid}/hands/${hand.uid}`,
      hand,
    );
    yield put({
      type: EDIT_HAND_SUCCEEDED,
    });
  } catch (e) {
    yield put({ type: EDIT_HAND_FAILED, message: e.message });
  }
}

export function* watchEditHandSaga() {
  yield takeLatest(EDIT_HAND_REQUESTED, editHand);
}

export default function* gameSagas() {
  yield fork(watchEditHandSaga);
}
