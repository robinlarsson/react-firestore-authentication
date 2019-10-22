export const GAME_FETCH_REQUESTED = 'GAMES_FETCH_REQUESTED';
export const GAME_FETCH_SUCCEEDED = 'GAMES_FETCH_SUCCEEDED';
export const GAME_FETCH_FAILED = 'GAMES_FETCH_FAILED';

export function fetchGame(id) {
  return { type: GAME_FETCH_REQUESTED, id };
}
