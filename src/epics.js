//[[[ Imports
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import vaultObservable from './vault-observable';

import {
  VAULT_AUTH_LOOKUP_SELF,
  vaultAuthLookupSelf,
  VAULT_SECRET_GENERIC_LIST,
  vaultSecretGenericList,
  VAULT_SECRET_GENERIC_PUT,
  vaultSecretGenericPut,
  vaultCompleted,
  vaultError }
  from './actions';

const _ = o => (console.log(o), o);
const completed = completed => {
  if (completed.action.always) return completed.action.always(completed);
  if (completed.payload.errors && completed.action.fail) return completed.action.fail(completed);
  if (completed.payload.data && completed.action.success) return completed.action.success(completed);
  return null;
};
//]]]
//[[[ Auth
export const vaultAuthLookupSelfEpic = (action$, store) => 
  action$.ofType(VAULT_AUTH_LOOKUP_SELF)
  .mergeMap(
    action =>
      vaultObservable.auth.token.lookupSelf(store.getState().vault)
      .map(payload=>vaultCompleted(payload, action))
  ) 
  .do(completed);

//]]]
//[[[ Secret
//[[[ Generic
export const vaultSecretGenericListEpic = (action$, store) =>
  action$.ofType(VAULT_SECRET_GENERIC_LIST)
  .mergeMap(
    action =>
      vaultObservable.secret.generic.list(store.getState().vault)
      .map(payload=>vaultCompleted(payload, action))
  ) 
  .do(completed);

export const vaultSecretGenericPutEpic = (action$, store) =>
  action$.ofType(VAULT_SECRET_GENERIC_PUT)
  .mergeMap(
    action =>
      vaultObservable.secret.generic.put(store.getState().vault, action.data)
      .map(payload=>vaultCompleted(payload, action))
  ) 
  .do(completed);
  //]]]
//]]]
export default combineEpics(
//  vaultAuthSetTokenEpic,
  vaultAuthLookupSelfEpic
);
