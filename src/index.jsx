import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';


import 'typeface-roboto';
import 'normalize.css';
import './style.css';

import App from './components/app';
import rootEpic from './epics';
import store from './store';
import { epicMiddleware } from './store';

/*
import LogRocket from "logrocket";
LogRocket.init("ijym8y/vault-project");
*/


const render = Component => { ReactDOM.render(
  <AppContainer>
    <BrowserRouter>
      <Provider store={store}>
        <Component/>
      </Provider>
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('reactMount')
);};

persistStore(store, { blacklist: ['form', 'xtransient', 'messages'], keyPrefix: 'vaultproject-ui' }, ()=>render(App));

if (module.hot) {
  module.hot.accept('./components/app', () => {
    epicMiddleware.replaceEpic(rootEpic);
    render(App);
  });
}
