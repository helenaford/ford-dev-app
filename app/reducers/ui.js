import update from 'immutability-helper';
import { RESET_NOTIFS } from './notifications';

export const UPDATE_NOTIF_ID_COUNTER = 'UPDATE_NOTIF_ID_COUNTER';

export const initialState = { idCounter: 0 };

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NOTIF_ID_COUNTER:
      return { idCounter: action.idCounter };
    case RESET_NOTIFS:
      return initialState;
    default:
      return state;
  }
}
