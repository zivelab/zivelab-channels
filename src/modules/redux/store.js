/* eslint-disable no-underscore-dangle */

import { createStore, combineReducers } from "redux";
import themeReducer from "./themeReducer";
import titleReducer from "./titleReducer";

const store = createStore(
  combineReducers({
    theme: themeReducer,
    title: titleReducer
  })
);

export default store;
