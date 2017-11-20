import u from 'update-immutable';
import { fmsKVsEditor } from './machines';
import * as A from './actions';
// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);
// [[[ KVs
const stateKVsEditor = {};
fmsKVsEditor.changeKVs(stateKVsEditor, {});

const kvsEditor = (state = stateKVsEditor.state, action) => {
  switch (action.type) {
    case A.VAULT_COMPLETED:
      if (action.action.type === A.VAULT_SECRET_GENERIC_GET) {
        fmsKVsEditor.changeKVs(
          stateKVsEditor,
          action.payload.data ? action.payload.data.data : {}
        );
        return stateKVsEditor.state;
      }
      break;
    case A.KV_START_ADD_AT:
      fmsKVsEditor.addAt(stateKVsEditor, action.pos);
      return stateKVsEditor.state;
    case A.KV_START_EDIT_OF:
      fmsKVsEditor.editOf(stateKVsEditor, action.key);
      return stateKVsEditor.state;
    case A.KV_CANCEL_ADD:
      fmsKVsEditor.stopEdit(stateKVsEditor);
      return stateKVsEditor.state;
  }
  return state;
};
// ]]]
// [[[ Transient & Persistent
const initPersistent = { lastTab: '/secret/generic' };

const persistent = (state = initPersistent) => state;

const initTransient = { isDrawerOpen: false };
const transient = (state = initTransient, action) => {
  switch (action.type) {
    case A.UI_DRAWER_OPEN:
      return {
        ...state,
        isDrawerOpen: true
      };
    case A.UI_DRAWER_CLOSE:
      return {
        ...state,
        isDrawerOpen: false
      };
  }
  return state;
};
// ]]]
// [[[ Message
const initMessages = {
  vaultErrors: [],
  errors: []
};
const messages = (state = initMessages, action) => {
  switch (action.type) {
    case A.VAULT_COMPLETED:
      return {
        ...state,
        errors:
          action.payload.errors &&
            (action.payload.errors.map
              ? action.payload.errors
              : [action.payload.errors]) ||
          [],
        vaultErrors:
          action.payload.errors &&
            (action.payload.errors.map
              ? action.payload.errors
              : [action.payload.errors]) ||
          []
      };
  }
  return state;
};
// ]]]
// [[[ Vault
const initVaultState = {
  isTokenVerified: false,
  isVaultQuerying: false,
  cache: { secret: { generic: { folders: { '/': null } } } }
};

const vaultState = (state = initVaultState, action) => {
  switch (action.type) {
    case A.VAULT_EXIT:
      return {
        ...state,
        isTokenVerified: false
      };
    case A.VAULT_AUTH_LOOKUP_SELF:
      return {
        ...state,
        isVaultQuerying: true
      };
    case A.VAULT_COMPLETED:
      switch (action.action.type) {
        case A.VAULT_AUTH_LOOKUP_SELF:
          return {
            ...state,
            isVaultQuerying: false,
            isTokenVerified: true
          };
        case A.VAULT_SECRET_GENERIC_LIST:
          return {
            ...state,
            isVaultQuerying: false,
            cache:
              action.payload.data &&
                u(state.cache, { secret: { generic: { folders: { [action.action.path]: { $set: action.payload.data.data.keys } } } } }) ||
              {}
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
    generic: { mount: '/secret' },
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
// ]]]
// [[[ export
export default {
  persistent,
  kvsEditor,
  transient,
  messages,
  vaultState,
  vaultConfig
};
// ]]]
