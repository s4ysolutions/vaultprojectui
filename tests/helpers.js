import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createEpicMiddleware } from 'redux-observable';

import reducers from '../src/reducers';
import rootEpic from '../src/epics';

import delay from '../src/lib/delay';

const VAULT_HOST = 'http://127.0.0.1:8200';
global.nock = require('nock');
global.vaultObservable = require('../src/vault-observable');
global.chai = require('chai');
global.expect = chai.expect;
global.assert = chai.assert;

global.vaultConfig = {
  uri: VAULT_HOST,
  auth: {
    token: 'token'
  }
};
global.nocker = nock(VAULT_HOST);

global.storeFactory = () =>
  createStore(
    combineReducers({
      ...reducers,
      form: formReducer
    }),
    compose(applyMiddleware(createEpicMiddleware(rootEpic)))
  );

global.delay = delay;
global.rootEpic = rootEpic;

global.vaultConfig = {
  url: null,
  auth: {
    token: null
  },
  secret: {
    generic: {
      mount: '/secret'
    }
  }
};

global.initVault = function() {
  vaultConfig.auth.token = process.env.VAULT_TOKEN;
  if (!vaultConfig.auth.token)
    throw Error('VAULT_TOKEN env variable is not set');
  vaultConfig.url = process.env.VAULT_ADDR;
  if (!vaultConfig.url) throw Error('VAULT_ADDR env variable is not set');
  vaultConfig.secret.generic.mount =
    process.env.VAULT_SECRET_GENERIC_MOUNT || vaultConfig.secret.generic.mount;
};

