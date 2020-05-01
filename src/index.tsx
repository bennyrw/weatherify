import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { reducer } from './reducers';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { StoreState, getInitialState } from './store';
import { Action } from './actions';
import { fetchForecastSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();
const initialState = getInitialState();
const store = createStore<StoreState, Action, any, any>(reducer,
  initialState,
  applyMiddleware(sagaMiddleware));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

sagaMiddleware.run(fetchForecastSaga);

// todo - remove
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
