import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "typeface-roboto";

import App from "./components/app";

const render = Component => { ReactDOM.render(
  <BrowserRouter>
    <Component/>
  </BrowserRouter>,
  document.getElementById("reactMount")
);};

render(App);
