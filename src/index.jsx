import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppContainer } from "react-hot-loader";
import "typeface-roboto";

import App from "./components/app";

/*
import LogRocket from "logrocket";
LogRocket.init("ijym8y/vault-project");
*/

const render = Component => { ReactDOM.render(
  <AppContainer>
    <BrowserRouter>
      <Component/>
    </BrowserRouter>
  </AppContainer>,
  document.getElementById("reactMount")
);};

render(App);

if (module.hot) {
  module.hot.accept("./components/app", () => {
    render(App);
  });
}
