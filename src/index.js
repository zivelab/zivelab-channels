import "./bootstrap";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./modules/redux/store";
import AppWrapper from "./modules/components/AppWrapper";
import Index from "./pages/Index";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <AppWrapper>
      <Index />
    </AppWrapper>
  </Provider>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
