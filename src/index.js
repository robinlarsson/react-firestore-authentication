import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import * as serviceWorker from './serviceWorker';
import rootReducers from './reducers';
import rootSaga from './sagas';

import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';
import { GamesProvider } from './context/GamesContext';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <GamesProvider>
        <App />
      </GamesProvider>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
