import { ACTION_TYPES } from "../constants";

const initialAbout = {};

function aboutReducer(state = initialAbout, action) {
  let newState = state;

  if (action.type === ACTION_TYPES.ABOUT_CHANGE) {
    newState = action.payload.about || state;
  }

  return newState;
}

export default aboutReducer;
