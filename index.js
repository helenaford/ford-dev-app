/**
 * @format
 */

import { AppRegistry, AsyncStorage, AppState } from 'react-native';
import firebase from 'react-native-firebase';
// eslint-disable-next-line import/named
import { store } from './app/store';
import App from './App';
import { name as appName } from './app.json';

const backgroundHandler = async remoteMessage => {
  console.log('MyNotifPipeline backgroundHandler', remoteMessage);
  try {
    const notification = {
      data: remoteMessage.data,
      notificaitonid: remoteMessage.messageId,
      status: 'RECEIVED',
      config: {
        type: 'DATA',
        isRemote: true,
        scheduledTime: remoteMessage.sentTime, // TEMP: making use of the scheduledTime logic to display the date
      },
      log: [
        {
          name: 'RNFirebaseBackgroundMessageHeadlessTask',
          islistener: true,
        },
      ],
      details: {
        by: 'RNFirebaseBackgroundMessageHeadlessTask',
        appState: AppState.currentState,
      },
    };

    store.dispatch({ type: 'ADD_NOTIF', notification });
  } catch (e) {
    console.log('backgroundHandler', e);
  }
};

AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => backgroundHandler,
);
AppRegistry.registerComponent(appName, () => App);

/**  TBD: Notifications with actions (next blog post)
*
* const bgActions = async remoteMessage => {
* };

* AppRegistry.registerHeadlessTask(
*   'RNFirebaseBackgroundNotificationAction',
*   () => bgActions,
* );
*/
