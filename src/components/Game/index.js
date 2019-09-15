import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';
import Games from './Games';
import Game from './Game';
import * as ROUTES from '../../constants/routes';

const GamePage = () => (
  <>
    <Switch>
      <Route exact path={ROUTES.GAME_DETAILS} component={Game} />
      <Route exact path={ROUTES.GAME} component={Games} />
    </Switch>
  </>
);

const condition = authUser => authUser;

export default compose(withAuthorization(condition))(GamePage);
