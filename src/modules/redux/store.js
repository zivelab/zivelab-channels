/* eslint-disable no-underscore-dangle */

import { createStore, combineReducers } from "redux";
import themeReducer from "./themeReducer";

const store = createStore(
  combineReducers({
    theme: themeReducer
  })
);

export default store;
