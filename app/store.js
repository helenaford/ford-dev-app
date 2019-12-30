import React from 'react';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

// TBD: move into .env
const ENABLE_REDUX_LOGGER = false;

function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middleware = [thunk];
  if (ENABLE_REDUX_LOGGER) middleware.push(logger);
  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  const persistor = persistStore(store, null);

  const StoreContext = React.createContext();

  return { persistor, store, StoreContext };
}

module.exports = configureStore();
