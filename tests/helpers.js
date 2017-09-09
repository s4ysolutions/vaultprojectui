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
global.assert = require('chai').assert;

global.vault = {
  uri: VAULT_HOST,
  auth: {
    token: 'token'
  }
};
// need to test DNS errros
// nock.disableNetConnect();
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

global.vault = {
    url: null,
    auth: {
      token: null
    },
    secret: {
      generic: {
        mount: null
      }
    }
  };

global.initVault=function(){
    vault.auth.token = process.env.VAULT_TOKEN;
    if (!vault.auth.token) throw Error('VAULT_TOKEN env variable is not set');
    vault.url = process.env.VAULT_ADDR;
    if (!vault.url) throw Error('VAULT_ADDR env variable is not set');
  };
