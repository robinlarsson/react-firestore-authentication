import { useContext } from 'react';
import { useSelector } from 'react-redux';

import { AuthUserContext } from '../components/Session';

const useGame = () => {
  const game = useSelector(state => state.game.game);
  const hands = useSelector(state => state.game.hands);
  const gameLoading = useSelector(state => state.game.gameLoading);
  const authUser = useContext(AuthUserContext);

  const authUserHand = hands.find(hand => {
    return authUser.uid === hand.userId;
  });

  const isCurrentPlayer = authUserHand
    ? game.player === authUserHand.player
    : false;

  const setNextPlayer = hand => {
    return {
      [Symbol.iterator](players) {
        let currentPlayerIndex = 0;

        Object.keys(players).forEach((key, index) => {
          if (key === hand.player) {
            currentPlayerIndex = index;
          }
        });

        return {
          next() {
            if (currentPlayerIndex < players.length) {
              currentPlayerIndex = 0;
            }

            return Number(Object.keys(players)[currentPlayerIndex++]);
          },
        };
      },
    };
  };

  return {
    game,
    hands,
    currentPlayer: game ? game.player : 0,
    isCurrentPlayer,
    setNextPlayer,
    hand: authUserHand,
    authUser,
    gameLoading,
  };
};

export default useGame;
