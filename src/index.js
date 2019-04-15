import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";

import "./bootstrap";
// --- Post bootstrap -----
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./modules/redux/store";
import AppWrapper from "./modules/components/AppWrapper";
import App from "./modules/components/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <AppWrapper>
      <App />
    </AppWrapper>
  </Provider>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
