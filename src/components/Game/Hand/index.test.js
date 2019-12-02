import React from 'react';
import { render } from '@testing-library/react';
import Hand from './hand';

const game = {
  betStarted: false,
  createdAt: '',
  name: 'game1',
  player: 1,
  round: 0,
  turn: 0,
  userId: 'user1',
};

const hands = [
  {
    bet: 0,
    cards: {
      1: false,
      2: false,
      3: false,
      4: false,
    },
    hasFolded: false,
    hasWon: false,
    player: 1,
    uid: 'hand1',
    userId: 'user1',
  },
];

const props = {
  game,
  hands,
  hand: hands[0],
  gameId: 'gameid1',
};

describe('Hand', () => {
  test('renders', () => {
    const { queryByLabelText, getByLabelText } = render(
      <Hand {...props} />,
    );

    expect(queryByLabelText(/Player 1,/i)).toBeTruthy();
  });
});
