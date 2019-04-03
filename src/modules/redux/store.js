/* eslint-disable no-underscore-dangle */

import { createStore, combineReducers } from "redux";
import aboutReducer from "./aboutReducer";
import themeReducer from "./themeReducer";
import titleReducer from "./titleReducer";

const store = createStore(
  combineReducers({
    about: aboutReducer,
    theme: themeReducer,
    title: titleReducer
  })
);

export default store;
