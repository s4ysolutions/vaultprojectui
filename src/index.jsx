import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'mobx-react';

import 'typeface-roboto';
import 'normalize.css';
import './style.css';

import App from './components/app';

import store from 'store';

// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);

/*
 * Import LogRocket from "logrocket";
 * LogRocket.init("ijym8y/vault-project");
 */

const render = Component => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider mobx={store}>
        <Component />
      </Provider>
    </BrowserRouter>,
    document.getElementById('reactMount')
  );
};
render(App);

if (module.hot) {
  module.hot.accept(() => {
    render(App);
  });
}
