import { ACTION_TYPES } from "../constants";

const initialNotifications = [];

function notificationsReducer(state = initialNotifications, action) {
  let newState = state;

  if (action.type === ACTION_TYPES.ENQUEUE_SNACKBAR) {
    newState = [...state, action.payload.notification];
  } else if (action.type === ACTION_TYPES.REMOVE_SNACKBAR) {
    newState = state.filter(notification => notification.key !== action.key);
  }
  return newState;
}

export default notificationsReducer;
