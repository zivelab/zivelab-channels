import { ACTION_TYPES } from "../constants";

const initialTitle = document.title;

function titleReducer(state = initialTitle, action) {
  let newState = state;

  if (action.type === ACTION_TYPES.TITLE_CHANGE) {
    newState = action.payload.title || state.title;
  }

  return newState;
}

export default titleReducer;
