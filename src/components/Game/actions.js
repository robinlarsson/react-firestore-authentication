export const GAME_FETCH_REQUESTED = 'GAME_FETCH_REQUESTED';
export const GAME_FETCH_SUCCEEDED = 'GAME_FETCH_SUCCEEDED';
export const GAME_FETCH_FAILED = 'GAME_FETCH_FAILED';
export const HANDS_FETCH_REQUESTED = 'HANDS_FETCH_REQUESTED';
export const HANDS_FETCH_SUCCEEDED = 'HANDS_FETCH_SUCCEEDED';
export const HANDS_FETCH_FAILED = 'HANDS_FETCH_FAILED';
export const SYNC_HANDS_REQUESTED = 'SYNC_HANDS_REQUESTED';
export const SYNC_HANDS_SUCCEEDED = 'SYNC_HANDS_SUCCEEDED';
export const SYNC_HANDS_FAILED = 'SYNC_HANDS_FAILED';
export const JOIN_GAME_REQUESTED = 'JOIN_GAME_REQUESTED';
export const JOIN_GAME_SUCCEEDED = 'JOIN_GAME_SUCCEEDED';
export const JOIN_GAME_FAILED = 'JOIN_GAME_FAILED';
export const SYNC_GAME_REQUESTED = 'SYNC_GAME_REQUESTED';
export const SYNC_GAME_SUCCEEDED = 'SYNC_GAME_SUCCEEDED';
export const SYNC_GAME_FAILED = 'SYNC_GAME_FAILED';

export function fetchGame(id) {
  return { type: GAME_FETCH_REQUESTED, id };
}

export function fetchHands(id) {
  return { type: HANDS_FETCH_REQUESTED, id };
}

export function joinGame(id, hands, game, authUser) {
  return { type: JOIN_GAME_REQUESTED, id, hands, game, authUser };
}

export function syncGame(snapshot) {
  return {
    type: SYNC_GAME_REQUESTED,
    snapshot,
  };
}

export function syncGameError(snapshot) {
  return {
    type: SYNC_GAME_FAILED,
    snapshot,
  };
}

export function syncHands(snapshot) {
  return {
    type: SYNC_HANDS_REQUESTED,
    snapshot,
  };
}

export function syncHandsError(snapshot) {
  return {
    type: SYNC_HANDS_FAILED,
    snapshot,
  };
}
