import React from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

import { editGame } from '../../Games/actions';
import { editHand } from './actions';
import Fold from '../Fold';
import Bet from '../Bet';
import useGame from '../../../hooks/useGame';

const useStyles = makeStyles(theme => ({
  paperCard: {
    height: 140,
    width: 100,
    cursor: 'pointer',
  },
  betting: {
    cursor: 'inherit',
  },
}));

export const Hand = () => {
  const dispatch = useDispatch();
  const {
    hand,
    authUser,
    game,
    getNextPlayer,
    getNextRound,
  } = useGame();
  const cards = hand.cards;
  const betting = game.betStarted;
  const classes = useStyles();

  const onPlayCard = card => {
    dispatch(
      editHand(game, {
        ...hand,
        cards: { ...hand.cards, [card]: true },
      }),
    );

    dispatch(
      editGame({
        ...game,
        player: getNextPlayer(),
        round: getNextRound(),
        turn: Number(game.turn + 1),
      }),
    );
  };

  return (
    <>
      {hand && (
        <>
          <h1>
            Player {hand.player}, {authUser.email}'s hand
          </h1>

          <Bet />
          <Fold />

          {Object.keys(cards).map((value, key) => {
            const cardPlayed = cards[value];
            console.log(cardPlayed, value);
            return cardPlayed ? (
              ''
            ) : (
              <Grid key={key} item>
                <Paper
                  className={`${classes.paperCard} ${
                    betting ? classes.betting : ''
                  }`}
                  onClick={() => !betting && onPlayCard(value)}
                >
                  <PlayCircleOutlineIcon
                    color={`${betting ? 'disabled' : 'primary'}`}
                  />
                  {value < 4 ? (
                    <SentimentSatisfiedAltIcon />
                  ) : (
                    <SentimentVeryDissatisfiedIcon />
                  )}
                </Paper>
              </Grid>
            );
          })}
        </>
      )}
    </>
  );
};

export default Hand;
