import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';

import 'typeface-roboto';
import 'normalize.css';
import './style.css';

import reducers from './reducers';
import App from './components/app';

/*
import LogRocket from "logrocket";
LogRocket.init("ijym8y/vault-project");
*/
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    ...reducers,
    form: formReducer
  }),
  composeEnhancers(
    applyMiddleware(
      // createEpicMiddleware(rootEpic, { dependencies: { request } })
      // thunkMiddleware
      //	,			createLogger()
    ),
    //    autoRehydrate()
    //,window.devToolsExtension ? window.devToolsExtension():f=>f
  )
);

const render = Component => { ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <Component/>
      </BrowserRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('reactMount')
);};

render(App);

if (module.hot) {
  module.hot.accept('./components/app', () => {
    render(App);
  });
}
