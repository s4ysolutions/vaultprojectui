import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';


import 'typeface-roboto';
import 'normalize.css';
import './style.css';

import App from './components/app';
import rootEpic from './epics';
import reducers from './reducers';
import store, { epicMiddleware } from './store';

/*
Import LogRocket from "logrocket";
LogRocket.init("ijym8y/vault-project");
*/


const render = (Component) => {

  ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
          <Component />
      </Provider>
    </BrowserRouter>,
    document.getElementById('reactMount')
  );

};

persistStore(store, {
  'blacklist': [
    'form',
    'xtransient',
    'messages'
  ],
  'keyPrefix': 'vaultproject-ui'
}, () => render(App));
if (module.hot) {

  module.hot.accept(() => {

    console.log(module.hot);
    epicMiddleware.replaceEpic(rootEpic);
    store.replaceReducer(reducers);
    render(App);

  });

}
