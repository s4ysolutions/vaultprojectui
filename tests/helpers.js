import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createEpicMiddleware } from 'redux-observable';

import reducers from '../src/reducers';
import rootEpic from '../src/epics';

import delay from '../src/lib/delay';

const VAULT_HOST = 'http://127.0.0.1:8200';
global.nock = require('nock');
global.vaultObservable = require('../src/vault-observable');
global.expect = require('chai').expect;

global.vault = {
  uri: VAULT_HOST,
  auth: {
    token: 'token'
  }
};
// need to test DNS errros
//nock.disableNetConnect();
global.nocker = nock(VAULT_HOST);


global.storeFactory = () => createStore(
  combineReducers({
    ...reducers,
    form: formReducer
  }),
  compose(
    applyMiddleware(
      createEpicMiddleware(rootEpic)
    )
  )
);

global.delay = delay;
global.rootEpic = rootEpic;
