import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import GameList from './GameList';
import { fetchGames } from './actions';
import AddGame from './AddGame';

const Games = ({ games, loading, onFetchGames }) => {
  useEffect(() => {
    onFetchGames();
  }, [onFetchGames]);

  return (
    <div>
      {loading && <div>Loading ...</div>}
      {!loading && games && <GameList />}
      {!loading && !games && <div>There are no games ...</div>}
      <AddGame />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    games: state.games.games,
    loading: state.games.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchGames: () => {
      dispatch(fetchGames());
    },
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(Games);
