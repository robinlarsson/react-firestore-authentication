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
import { GAME_STATUS } from '../../Games/sagas';
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
  disabled: {
    cursor: 'inherit',
  },
}));

export const Hand = () => {
  const dispatch = useDispatch();
  const {
    hand,
    authUser,
    game,
    isCurrentPlayer,
    getNextPlayer,
    getNextRound,
  } = useGame();
  const cards = hand.cards;
  const isBetting = game.status === GAME_STATUS.betting;
  const classes = useStyles();
  const isDisabled = !isCurrentPlayer || isBetting;
  console.log(game);
  const onPlayCard = card => {
    dispatch(
      editHand(game, {
        ...hand,
        cards: { ...hand.cards, [card]: true }, // add card id and pass that around?
      }),
    );

    const playedCardsByCurrentPlayer =
      game.playedCards[game.player] || [];

    dispatch(
      editGame({
        ...game,
        player: getNextPlayer(),
        round: getNextRound(),
        turn: Number(game.turn + 1),
        playedCards: {
          ...game.playedCards,
          [game.player]: [...playedCardsByCurrentPlayer, card],
        },
      }),
    );
  };

  return (
    <>
      {hand && (
        <>
          <Container maxWidth="sm">
            <Grid item xs={12}>
              <h1>
                Player {hand.player}, {authUser.email}'s hand
              </h1>

              <Bet />
              <Fold />

              <Grid container justify="center" spacing={2}>
                {Object.keys(cards).map((value, key) => {
                  const cardPlayed = cards[value];

                  return cardPlayed ? (
                    ''
                  ) : (
                    <Grid key={key} item>
                      <Paper
                        className={`${classes.paperCard} ${
                          isDisabled ? classes.disabled : ''
                        }`}
                        onClick={() =>
                          !isDisabled && onPlayCard(value)
                        }
                      >
                        <PlayCircleOutlineIcon
                          color={`${
                            isDisabled ? 'disabled' : 'primary'
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
    </>
  );
};

export default Hand;
