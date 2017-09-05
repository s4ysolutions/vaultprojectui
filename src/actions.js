//[[[ Vault
//[[[ Error
export const VAULT_ERROR = 'VAULT_ERROR';
export const vaultError = error => ({
  type: VAULT_ERROR,
  error
});
//]]]
//[[[ URI
export const VAULT_SET_URI = 'VAULT_SET_URI';
export const vaultSetURI = uri => ({
  type: VAULT_SET_URI,
  uri
});
//]]]
//[[[ Auth
export const VAULT_AUTH_SET_TOKEN = 'VAULT_AUTH_SET_TOKEN';
export const vaultAuthSetToken = (token) => ({
  type: VAULT_AUTH_SET_TOKEN,
  token
});

export const VAULT_AUTH_LOOKUP_SELF = 'VAULT_AUTH_LOOKUP_SELF';
export const vaultAuthLookupSelf = () => ({
  type: VAULT_AUTH_LOOKUP_SELF
});
export const VAULT_AUTH_LOOKUP_SELF_PAYLOAD = 'VAULT_AUTH_LOOKUP_SELF_PAYLOAD';
export const vaultAuthLookupSelfPayload = (payload) => ({
  type: VAULT_AUTH_LOOKUP_SELF_PAYLOAD,
  payload
});
//]]]
//]]]
