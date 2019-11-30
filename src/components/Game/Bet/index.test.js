import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Bet from './';

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
      first: false,
      forth: false,
      second: false,
      third: false,
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

describe('Bet', () => {
  test('adds 1 + 2 to equal 3', () => {
    const { queryByLabelText, getByLabelText } = render(
      <Bet {...props} />,
    );

    expect(queryByLabelText(/off/i)).toBeTruthy();
  });

  test('Bet updates hand of current player', () => {});

  test('Bet updates player and rounds', () => {});

  test('Bet can only be made by current player', () => {});

  test('Bet cannot be larger than the amount of cards played', () => {});

  test('Bet field must be numeric', () => {});
});
