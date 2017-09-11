import u from 'update-immutable';
import * as A from './actions';
// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);
//[[[ Persistent
const initPersistent = {
  lastTab: '/secret/generic'
};

const persistent = (state = initPersistent, action) => {
  return state;
};

const initTransient = {
  isDrawerOpen: false
};
const transient = (state = initTransient, action) => {
  switch (action.type) {
    case A.UI_DRAWER_OPEN:
      return { ...state, isDrawerOpen: true };
    case A.UI_DRAWER_CLOSE:
      return { ...state, isDrawerOpen: false };
  }
  return state;
};
//]]]
//[[[ Message
const initMessages = {
  vaultErrors: [],
  errors: []
};
const messages = (state = initMessages, action) => {
  switch (action.type) {
    case A.VAULT_COMPLETED:
      return {
        ...state,
        errors: action.payload.errors || [],
        vaultErrors: action.payload.errors || []
      };
  }
  return state;
};
//]]]
//[[[ Vault
const initVaultState = {
  isTokenVerified: false,
  isVaultQuerying: false,
  cache: {
    secret: {
      generic: {
        folders: {
          '/': null
        }
      }
    }
  }
};

const vaultState = (state = initVaultState, action) => {
  switch (action.type) {
    case A.VAULT_EXIT:
      return { ...state, isTokenVerified: false };
    case A.VAULT_AUTH_LOOKUP_SELF:
      return { ...state, isVaultQuerying: true };
    case A.VAULT_COMPLETED:
      switch (action.action.type) {
        case A.VAULT_AUTH_LOOKUP_SELF:
          return { ...state, isVaultQuerying: false, isTokenVerified: true };
        case A.VAULT_SECRET_GENERIC_LIST:
          return {
            ...state,
            isVaultQuerying: false,
            cache: u(state.cache, {
              secret: {
                generic: {
                  folders: {
                    [action.action.path]: {
                      $set: action.payload.data.data.keys
                    }
                  }
                }
              }
            })
          };
      }
  }
  return state;
};

const initVaultConfig = {
  url:
    typeof window !== 'undefined' &&
    window.location.hostname.indexOf('amazon') > 0
      ? 'http://dev2.s4y.solutions:8200'
      : 'http://127.0.0.1:8200',
  auth: {
    token:
      typeof window !== 'undefined' &&
      window.location.hostname.indexOf('amazon') > 0
        ? '0fdbccde-b6ad-a3cc-412f-60a2b26e1b1c'
        : null
  },
  secret: {
    generic: {
      mount: '/secret'
    },
    consul: {}
  }
};

const vaultConfig = (state = initVaultConfig, action) => {
  switch (action.type) {
    case A.VAULT_SET_URL:
      return u(state, { url: { $set: action.url } });
    case A.VAULT_AUTH_SET_TOKEN:
      return u(state, { auth: { token: { $set: action.token } } });
  }
  return state;
};
//]]]
//[[[ export
export default {
  persistent,
  transient,
  messages,
  vaultState,
  vaultConfig
};
//]]]
