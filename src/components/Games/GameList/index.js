import React from 'react';
import { connect } from 'react-redux';

import GameItem from '../GameItem';

const GameList = ({ games }) => {
  return (
    <ul>
      {games &&
        Object.values(games).map((game, index) => (
          <GameItem key={index} game={game} />
        ))}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    games: state.games.games,
  };
};

const withConnect = connect(mapStateToProps);

export default withConnect(GameList);
