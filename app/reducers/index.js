import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import notifications from './notifications';
import ui from './ui';

const LOGOUT = 'LOGOUT';

const rootPersistConfig = {
  key: 'root',
  timeout: 20000,
  storage: AsyncStorage,
};

const appReducer = combineReducers({
  notifications,
  ui,
});

const rootReducer = (state, action) => {
  const { type, meta } = action;
  let newState = state;

  return appReducer(newState, action);
};

export default persistReducer(rootPersistConfig, rootReducer);
