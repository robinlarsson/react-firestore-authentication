import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGame, fetchHands } from '../components/Game/actions';
import { AuthUserContext } from '../components/Session';

const useGameLoader = gameId => {
  const game = useSelector(state => state.game.game);
  const hands = useSelector(state => state.game.hands);
  const gameLoading = useSelector(state => state.game.gameLoading);
  const authUser = useContext(AuthUserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGame(gameId));
    dispatch(fetchHands(gameId));
  }, [dispatch, gameId]);

  return {
    game,
    hands,
    gameLoading,
    authUser,
  };
};

export default useGameLoader;
