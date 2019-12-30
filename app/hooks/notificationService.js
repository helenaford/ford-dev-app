import React, { useEffect, useState, useRef } from 'react';
import { AppState } from 'react-native';

import isEmpty from 'lodash.isempty';
import { useNotifs } from './notifications';
import { fcm } from '../utils';

export const useNotificationService = () => {
  const listenersRef = useRef();
  const notifs = useNotifs();

  useEffect(() => {
    async function callInitialise() {
      // initialise fcm and listeners
      listenersRef.current = await initialise();
    }
    callInitialise();
    return function cleanup() {
      // clear listeners
      fcm.clearListeners(listenersRef.current);
    };

    /* https://github.com/facebook/react/issues/15865 */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    function handleAppStateChange(nextAppState) {
      if (nextAppState === 'active') {
        fcm.getScheduledNotifications().then(notifications => {
          console.log(
            'MyNotifPipeline APP | getScheduledNotifications notifications',
            notifications,
          );
          notifs.updateNotifs(notifications, 'PENDING');
        });

        fcm.getDeliveredNotifications().then(notifications => {
          console.log(
            'MyNotifPipeline APP | getDeliveredNotifications notifications',
            notifications,
          );
          notifs.updateNotifs(notifications, 'RECEIVED');
        });
      }

      setAppState(nextAppState);
    }

    AppState.addEventListener('change', handleAppStateChange);

    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, [appState, notifs]);

  function handleNotifPress(notification, details) {
    notifs.updateNotif(notification, {
      by: 'onNotificationOpened',
      appState: AppState.currentState,
    });
  }

  function getType(constructor, notification) {
    if (constructor === 'RemoteMessage') return 'DATA';
    if (
      constructor === 'Notification' &&
      Object.keys(notification.data).length === 1
    ) {
      return 'NOTIFICATION';
    }

    return 'BOTH';
  }

  function parseNotif(notification) {
    const constructor = notification.constructor.name;
    console.log(
      'MyNotifPipeline APP | PARSE NOFI',
      notification.constructor.name,
    );
    return {
      id: notification.notificationId || notification.messageId,
      notificationId: notification.notificationId || notification.messageId,
      title: notification.title,
      body: notification.body,
      data: notification.data,
      date: notification.date,
      config: {
        isRemote:
          constructor === 'RemoteMessage' ||
          (notification.data && !!notification.data['google.c.a.e']),
        type: getType(constructor, notification),
      },
    };
  }

  function handleNotificationReceived(notification, details = {}) {
    const parsed = parseNotif(notification);
    notifs.updateNotif({
      ...parsed,
      status: 'RECEIVED',
      details: {
        ...details,
        appState: AppState.currentState,
      },
    });
  }

  async function initialise() {
    // attempt to get token and create listener
    return fcm.attemptToGetToken().then(() => {
      // Build a channel
      fcm.createAndroidChannel();

      fcm.getInitialNotif({
        handleNotificationReceived,
        addNotifLog: notifs.updateNotifLog,
      });

      fcm.getScheduledNotifications().then(notifications => {
        console.log(
          'MyNotifPipeline APP | getScheduledNotifications notifications',
          notifications,
        );
        notifs.updateNotifs(notifications, 'PENDING');
      });

      fcm.getDeliveredNotifications().then(notifications => {
        console.log(
          'MyNotifPipeline APP | getDeliveredNotifications notifications',
          notifications,
        );
        notifs.updateNotifs(notifications, 'RECEIVED');
      });

      return fcm.createNotificationListeners({
        handleNotifPress,
        handleNotificationReceived,
        addNotifLog: notifs.updateNotifLog,
      });
    });
  }

  return null;
};

export default { useNotificationService };
