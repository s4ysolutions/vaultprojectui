import u from "update-immutable";
import * as A from "./actions";
// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);
//[[[ KVs
const DEFAULT_KVS = {};
const initKVs = {
  kvs: DEFAULT_KVS,
  addingAt: 0,
  editingKey: false
};

const kvs = (state = initKVs, action) => {
  switch (action.type) {
    case A.VAULT_COMPLETED:
      if (action.action.type === A.VAULT_SECRET_GENERIC_GET) {
        const kvs = action.payload.data.data;
        const editingKey =
          undefined !== kvs[state.editingKey] && state.editingKey;
        const l = Object.entries(kvs).length;
        const addingAt = editingKey === false && (l === 0 ? 0 : l - 1);
        return {
          ...state,
          kvs,
          editingKey,
          addingAt
        };
      }
      break;
    case A.KV_START_ADD_AT:
      const kl=Object.keys(state.kvs).length;
      return {
        ...state,
        addingAt:
          action.pos < Object.keys(state.kvs).length
            ? action.pos
            : state.kvs.length === 0 ? 0 : state.kvs.length - 1,
        editingKey: false
      };
      break;
    case A.KV_START_EDIT_OF:
      return { ...state, addingAt: false, editingKey: action.key };
      break;
    case A.KV_DELETE_OF:
      break;
    case A.KV_CANCEL_ADD:
    case A.KV_COMPLETE_EDIT:
      return {
        ...state,
        addingAt: state.kvs.length == 0 ? 0 : state.kvs.length - 1,
        editingKey: false
      };
  }
  return state;
};
//]]]
//[[[ Transient & Persistent
const initPersistent = {
  lastTab: "/secret/generic"
};

const persistent = (state = initPersistent, action) => {
  void action;
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
    edit_folder: false,
    secret: {
      generic: {
        folders: {
          "/": null
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
    typeof window !== "undefined" &&
    window.location.hostname.indexOf("amazon") > 0
      ? "http://dev2.s4y.solutions:8200"
      : "http://127.0.0.1:8200",
  auth: {
    token:
      typeof window !== "undefined" &&
      window.location.hostname.indexOf("amazon") > 0
        ? "0fdbccde-b6ad-a3cc-412f-60a2b26e1b1c"
        : null
  },
  secret: {
    generic: {
      mount: "/secret"
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
  kvs,
  transient,
  messages,
  vaultState,
  vaultConfig
};
//]]]
