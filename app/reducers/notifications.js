import update from 'immutability-helper';

export const ADD_NOTIF = 'ADD_NOTIF';
export const UPDATE_NOTIF = 'UPDATE_NOTIF';
export const RESET_NOTIFS = 'RESET_NOTIFS';
export const UPDATE_NOTIFS = 'UPDATE_NOTIFS';
export const SORT_NOTIFS = 'SORT_NOTIFS';
export const UPDATE_NOTIF_LOG = 'UPDATE_NOTIF_LOG';

export const initialState = [];

function updateNotifs(state, { notifications, status }) {
  let newState = state;

  notifications.forEach(item => {
    const index = state.findIndex(
      x => x.notificationId === item.notificationId,
    );
    const existingItem = state[index] || {};
    const updateItem = { ...existingItem, ...item, status };
    const getMethod =
      status === 'RECEIVED'
        ? 'getDeliveredNotifications'
        : 'getScheduledNotifications';

    // Try to understand if notification was received when app was inactive.
    // mainly for iOS as no listeners can run in background
    // set logs accordingly

    const { details, log = [] } = updateItem;
    if (!details || !details.by) {
      updateItem.details = {
        by: getMethod,
        appState: 'status === RECEIVED' ? 'inactive' : null,
      };
      updateItem.log = [...log, { name: getMethod }];
    }

    newState = update(newState, {
      [index === -1 ? newState.length : index]: {
        $set: updateItem,
      },
    });
  });

  return newState;
}

function updateNotifLog(state, action) {
  const index = state.findIndex(x => x.id === action.id);
  if (index === -1) return state;
  return update(state, {
    [index]: {
      log: {
        $set: [...(state[index].log || []), action.logEntry],
      },
    },
  });
}

function updateNotif(state, action) {
  const index = state.findIndex(x => x.id === action.id);
  if (index === -1) {
    return update(state, {
      $set: [action.notification, ...state],
    });
  }
  const { config, details } = action.notification;
  return update(state, {
    [index]: {
      $set: {
        ...state[index],
        ...action.notification,
        config: { ...state[index].config, ...config },
        details: { ...state[index].details, ...details },
      },
    },
  });
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIF:
      return [action.notification, ...state];
    case UPDATE_NOTIF:
      return updateNotif(state, action);
    case UPDATE_NOTIF_LOG:
      return updateNotifLog(state, action);
    case UPDATE_NOTIFS:
      return updateNotifs(state, action);
    case RESET_NOTIFS:
      return initialState;
    case SORT_NOTIFS:
      return state.sort((a, b) => (a.date > b.date ? 1 : -1));
    default:
      return state;
  }
}
