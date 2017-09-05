import u from 'update-immutable';
import * as A from './actions';

const initTransient = {
  token_verified: false,
  isVaultQuerying: false
};
const transient = (state = initTransient, action) => {
  switch (action.type){
    case A.VAULT_AUTH_SET_TOKEN:
      return { ...state, token_verified: false };
    case A.VAULT_AUTH_LOOKUP_SELF:
      return { ...state, isVaultQuerying: true };
    case A.VAULT_ERROR:
      return { ...state, isVaultQuerying: false };
    case A.VAULT_AUTH_LOOKUP_SELF_PAYLOAD:
      return { ...state, isVaultQuerying: false, token_verified: true };
  }
  return state;
};

const initMessages = {
  vaultErrors: []
};
const messages = (state = initMessages, action) => {
  switch (action.type){
    case A.VAULT_AUTH_LOOKUP_SELF:
      return { ...state, vaultErrors: [] };
      break;
    case A.VAULT_ERROR:
      if (action.error.response && action.error.response.xhr){
        const response = action.error.response;
        const errors = (response.type === 'application/json') ? response.body.errors : [response.text];
        return { ...state, vaultErrors: errors };
      }else if (action.error.message) {
        return { ...state, vaultErrors: [action.error.message] };
      }else {
        return { ...state, vaultErrors: [action.error] };
      }
  }
  return state;
};

const initVault = {
  uri: 'http://127.0.0.1:8200',
  auth: {
    token: null
  }
};
const vault = (state = initVault, action)=>{
  switch (action.type){
    case A.VAULT_SET_URI:
      return u(state, { uri: { $set: action.uri } });
    case A.VAULT_AUTH_SET_TOKEN:
      return u(state, { auth: { token: { $set: action.token } } });
  }
  return state;
};

export default {
  transient,
  messages,
  vault
};
