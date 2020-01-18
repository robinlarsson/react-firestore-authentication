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

  const isNewRound = authUserHand
    ? hands.length === authUserHand.player
    : false;

  const getNextPlayer = () => {
    const currentPlayer = game.player;
    const playingHands = hands.filter(hand => !hand.hasFolded);
    // todo sort by player number before assuming an order.
    const nextHand = playingHands.find(
      hand => isNewRound || hand.player > currentPlayer,
    );

    return nextHand ? nextHand.player : currentPlayer;
  };

  const getNextRound = () => {
    const currentRound = game ? game.round : 0;

    return isNewRound ? Number(currentRound + 1) : currentRound;
  };

  return {
    game,
    hands,
    currentPlayer: game ? game.player : 0,
    isCurrentPlayer,
    getNextPlayer,
    hand: authUserHand,
    authUser,
    gameLoading,
    getNextRound,
  };
};

export default useGame;
