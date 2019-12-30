import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useScreens } from 'react-native-screens';
// eslint-disable-next-line import/named
import { persistor, store } from './app/store';
import AppNavigator from './app/appNavigator';

useScreens();

console.disableYellowBox = true; // disable yellow box for tutorial purposes

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<View />} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
