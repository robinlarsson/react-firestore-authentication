import React from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

import { editGame } from '../../Games/actions';
import { editHand } from '../Hand/actions';
import useGame from '../../../hooks/useGame';

const useStyles = makeStyles(theme => ({
  paperCard: {
    height: 140,
    width: 100,
    cursor: 'pointer',
  },
  playedCard: {
    cursor: 'inherit',
  },
}));

export const Cards = () => {
  const {
    isCurrentPlayer,
    hand,
    game,
    getNextPlayer,
    getNextRound,
  } = useGame();
  const cards = hand.cards;
  const dispatch = useDispatch();
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
      {cards && (
        <>
          <Container maxWidth="sm">
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                {Object.keys(cards).map((value, key) => {
                  const cardPlayed = cards[value];
                  return (
                    <Grid key={key} item>
                      <Paper
                        className={`${classes.paperCard} ${
                          cardPlayed ? classes.playedCard : ''
                        }`}
                        onClick={() =>
                          isCurrentPlayer &&
                          !cardPlayed &&
                          onPlayCard(value)
                        }
                      >
                        <PlayCircleOutlineIcon
                          color={`${
                            cardPlayed ? 'disabled' : 'primary'
                          }`}
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
              </Grid>
            </Grid>
          </Container>
        </>
      )}

      {!cards && <div>Cards not found ...</div>}
    </>
  );
};

export default Cards;
