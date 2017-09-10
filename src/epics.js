//[[[ Imports
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import vaultObservable from './vault-observable';

import {
  VAULT_AUTH_LOOKUP_SELF,
  vaultAuthLookupSelf,
  VAULT_SECRET_GENERIC_LIST,
  VAULT_SECRET_GENERIC_PUT,
  VAULT_SECRET_GENERIC_GET,
  vaultSecretGenericList,
  vaultSecretGenericPut,
  vaultCompleted,
  vaultError
} from './actions';
//]]]
//[[[ Utils
// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);
const completed = completed => {
  if (completed.action.always) return completed.action.always(completed);
  if (undefined !== completed.payload.errors && completed.action.fail)
    return completed.action.fail(completed);
  if (undefined !== completed.payload.data && completed.action.success)
    return completed.action.success(completed);
  return null;
};
const createEpic = (actionType, firstOp) => (action$, store) =>
  action$
    .ofType(actionType)
    .mergeMap(action =>
      firstOp(action, store.getState().vault, store).map(payload =>
        vaultCompleted(payload, action)
      )
    )
    .do(completed);
//]]]
//[[[ Auth
export const vaultAuthLookupSelfEpic = createEpic(
  VAULT_AUTH_LOOKUP_SELF,
  (action, vault) => vaultObservable.auth.token.lookupSelf(vault)
);
/* 
  (action$, store) => 
  (action$.ofType(VAULT_AUTH_LOOKUP_SELF))
  .mergeMap(
    action =>
      vaultObservable.auth.token.lookupSelf(store.getState().vault)
      .map(payload=>vaultCompleted(payload, action))
  ) 
  .do(completed);
*/
//]]]
//[[[ Secret
//[[[ Generic
export const vaultSecretGenericListEpic = (action$, store) =>
  action$
    .ofType(VAULT_SECRET_GENERIC_LIST)
    .mergeMap(action =>
      vaultObservable.secret.generic
        .list(store.getState().vault)
        .map(payload => vaultCompleted(payload, action))
    )
    .do(completed);

export const vaultSecretGenericPutEpic = createEpic(
  VAULT_SECRET_GENERIC_PUT,
  (action, vault) =>
    vaultObservable.secret.generic.put(action.path, vault, action.kvs)
);

export const vaultSecretGenericGetEpic = createEpic(
  VAULT_SECRET_GENERIC_GET,
  (action, vault) => vaultObservable.secret.generic.get(action.path, vault)
);
//]]]
//]]]
export default combineEpics(
  //  vaultAuthSetTokenEpic,
  vaultAuthLookupSelfEpic,
  vaultSecretGenericGetEpic,
  vaultSecretGenericPutEpic
);
