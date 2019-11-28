export const EDIT_HAND_REQUESTED = 'EDIT_HAND_REQUESTED';
export const EDIT_HAND_SUCCEEDED = 'EDIT_HAND_SUCCEEDED';
export const EDIT_HAND_FAILED = 'EDIT_HAND_FAILED';

export function editHand(game, hand) {
  return { type: EDIT_HAND_REQUESTED, game, hand };
}
