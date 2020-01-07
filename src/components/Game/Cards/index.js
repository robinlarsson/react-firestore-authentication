import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  paperCard: {
    height: 140,
    width: 100,
  },
}));

export const Cards = ({ hand }) => {
  const cards = hand.cards;
  const classes = useStyles();

  return (
    <>
      {cards && (
        <>
          <Container maxWidth="sm">
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                {Object.keys(cards).map((value, key) => {
                  const cardPlayed = cards[value];
                  return !cardPlayed ? (
                    ''
                  ) : (
                    <Grid key={key} item>
                      <Paper className={`${classes.paperCard}`} />
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
