/* eslint-disable no-underscore-dangle */

import { createStore, combineReducers } from "redux";
import aboutReducer from "./aboutReducer";
import themeReducer from "./themeReducer";
import titleReducer from "./titleReducer";
import notificationsReducer from "./notificationsReducer";

const store = createStore(
  combineReducers({
    about: aboutReducer,
    theme: themeReducer,
    title: titleReducer,
    notifications: notificationsReducer
  }) /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
