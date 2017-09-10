import u from 'update-immutable';
import * as A from './actions';
//[[[ Persistent
const initPersistent = {
  lastTab: '/secret/generic'
};

const persistent = (state = initPersistent, action) => {
  return state;
};

const initTransient = {
  isTokenVerified: false,
  isVaultQuerying: false,
  isDrawerOpen: false
};
const transient = (state = initTransient, action) => {
  switch (action.type){
    case A.UI_DRAWER_OPEN:
      return { ...state, isDrawerOpen: true };
    case A.UI_DRAWER_CLOSE:
      return { ...state, isDrawerOpen: false };
    case A.VAULT_EXIT:
      return { ...state, isTokenVerified: false };
    case A.VAULT_AUTH_LOOKUP_SELF:
      return { ...state, isVaultQuerying: true };
    case A.VAULT_COMPLETED:
      return {
        ...state,
        isVaultQuerying: false,
        isTokenVerified: action.action.type === A.VAULT_AUTH_LOOKUP_SELF?true:state.isTokenVerified
      };
  }
  return state;
};
//]]]
//[[[ Message
const initMessages = {
  vaultErrors: []
};
const messages = (state = initMessages, action) => {
  switch (action.type){
    case A.VAULT_COMPLETED :
      return { ...state, vaultErrors: action.payload.errors || [] };
  }
  return state;
};
//]]]
//[[[ Vault
const initVault = {
  url: typeof window !== 'undefined' && window.location.hostname.indexOf('amazon') > 0 ? 'http://dev2.s4y.solutions:8200' : 'http://127.0.0.1:8200',
  auth: {
    token: typeof window !== 'undefined' && window.location.hostname.indexOf('amazon') > 0 ? '0fdbccde-b6ad-a3cc-412f-60a2b26e1b1c' : null
  },
  secret: {
    generic: {
      mount: '/secret'
    },
    consul: {
    }
  }
};
const vault = (state = initVault, action)=>{
  switch (action.type){
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
  vault
};
//]]]
