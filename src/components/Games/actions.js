export const GAMES_FETCH_REQUESTED = 'GAMES_FETCH_REQUESTED';
export const GAMES_FETCH_SUCCEEDED = 'GAMES_FETCH_SUCCEEDED';
export const GAMES_FETCH_FAILED = 'GAMES_FETCH_FAILED';
export const ADD_GAME_REQUESTED = 'ADD_GAME_REQUESTED';
export const ADD_GAME_SUCCEEDED = 'ADD_GAME_SUCCEEDED';
export const ADD_GAME_FAILED = 'ADD_GAME_FAILED';
export const EDIT_GAME_REQUESTED = 'EDIT_GAME_REQUESTED';
export const EDIT_GAME_SUCCEEDED = 'EDIT_GAME_SUCCEEDED';
export const EDIT_GAME_FAILED = 'EDIT_GAME_FAILED';
export const DELETE_GAME_REQUESTED = 'DELETE_GAME_REQUESTED';
export const DELETE_GAME_SUCCEEDED = 'DELETE_GAME_SUCCEEDED';
export const DELETE_GAME_FAILED = 'DELETE_GAME_FAILED';

export function fetchGames() {
  return { type: GAMES_FETCH_REQUESTED };
}

export function addGame(name, authUser) {
  return { type: ADD_GAME_REQUESTED, name, authUser };
}

export function editGame(game, name) {
  return { type: EDIT_GAME_REQUESTED, game, name };
}

export function deleteGame(id) {
  return { type: DELETE_GAME_REQUESTED, id };
}
