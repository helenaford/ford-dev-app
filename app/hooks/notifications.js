import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ADD_NOTIF,
  UPDATE_NOTIF,
  RESET_NOTIFS,
  UPDATE_NOTIFS,
  SORT_NOTIFS,
  UPDATE_NOTIF_LOG,
} from '../reducers/notifications';

export function useNotifs() {
  const notifications = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  function addNotif(notification, config, status) {
    dispatch({
      type: ADD_NOTIF,
      id: notification.notificationId,
      notification: {
        data: notification.data,
        id: notification.notificationId,
        title: notification.title,
        body: notification.body,
        notificationId: notification.notificationId,
        aps: notification.aps,
        date: notification.date,
        config: {
          ...config,
          isLocal: true,
          scheduledTime: notification.date,
        },
        status,
      },
    });
  }

  function updateNotif(notification) {
    dispatch({
      type: UPDATE_NOTIF,
      id: notification.id,
      notification,
    });
  }

  function updateNotifLog(notification, logEntry) {
    dispatch({
      type: UPDATE_NOTIF_LOG,
      id: notification.notificationId || notification.messageId,
      logEntry,
    });
  }

  function updateNotifs(notifs, status) {
    dispatch({
      type: UPDATE_NOTIFS,
      status,
      notifications: notifs,
    });
  }

  function resetNotifs() {
    dispatch({
      type: RESET_NOTIFS,
    });
  }

  function sortNotifs(direction = 'DESC') {
    dispatch({
      type: SORT_NOTIFS,
      direction,
    });
  }

  return {
    notifications,
    addNotif,
    updateNotif,
    updateNotifs,
    resetNotifs,
    sortNotifs,
    updateNotifLog,
  };
}

export default { useNotifs };
