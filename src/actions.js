// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);
//[[[ Noop
export const ACTION_NOOP = 'ACTION_NOOP';
export const actionNoop = () => ({
  type: ACTION_NOOP
});
//]]]
//[[[ Transient UI
export const UI_DRAWER_OPEN = 'UI_DRAWER_OPEN';
export const uiDrawerOpen = () => ({
  type: UI_DRAWER_OPEN
});
export const UI_DRAWER_CLOSE = 'UI_DRAWER_CLOSE';
export const uiDrawerClose = () => ({
  type: UI_DRAWER_CLOSE
});
//]]]
//[[[ Vault
//[[[ Completed
export const VAULT_COMPLETED = 'VAULT_COMPLETED';
export const vaultCompleted = (payload, query_action) => ({
  type: VAULT_COMPLETED,
  payload,
  action: query_action
});
//]]]
//[[[ URL
export const VAULT_SET_URL = 'VAULT_SET_URL';
export const vaultSetURL = url => ({
  type: VAULT_SET_URL,
  url
});
//]]]
//[[[ Auth
export const VAULT_EXIT = 'VAULT_EXIT';
export const vaultExit = () => ({
  type: VAULT_EXIT
});

export const VAULT_AUTH_SET_TOKEN = 'VAULT_AUTH_SET_TOKEN';
export const vaultAuthSetToken = token => ({
  type: VAULT_AUTH_SET_TOKEN,
  token
});

export const VAULT_AUTH_LOOKUP_SELF = 'VAULT_AUTH_LOOKUP_SELF';
export const vaultAuthLookupSelf = (alwaysOrSuccess, fail) => ({
  type: VAULT_AUTH_LOOKUP_SELF,
  always: !fail && alwaysOrSuccess,
  success: fail && alwaysOrSuccess,
  fail: fail
});
//]]]
//[[[ Secret
//[[[ Generic
export const VAULT_SECRET_GENERIC_LIST = 'VAULT_SECRET_GENERIC_LIST';
export const vaultSecretGenericList = (path, alwaysOrSuccess, fail) => ({
  type: VAULT_SECRET_GENERIC_LIST,
  path,
  always: !fail && alwaysOrSuccess,
  success: fail && alwaysOrSuccess,
  fail: fail
});
export const VAULT_SECRET_GENERIC_GET = 'VAULT_SECRET_GENERIC_GET';
export const vaultSecretGenericGet = (path, alwaysOrSuccess, fail) => ({
  type: VAULT_SECRET_GENERIC_GET,
  path,
  always: !fail && alwaysOrSuccess,
  success: fail && alwaysOrSuccess,
  fail: fail
});
export const VAULT_SECRET_GENERIC_PUT = 'VAULT_SECRET_GENERIC_PUT';
export const vaultSecretGenericPut = (path, kvs, alwaysOrSuccess, fail) => ({
  type: VAULT_SECRET_GENERIC_PUT,
  path,
  kvs,
  always: !fail && alwaysOrSuccess,
  success: fail && alwaysOrSuccess,
  fail: fail
});
//]]]
//]]]
//]]]
