//[[[ Imports
import { combineEpics } from 'redux-observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import vaultObservable from './vault-observable';

import {
  VAULT_AUTH_LOOKUP_SELF,
  VAULT_SECRET_GENERIC_LIST,
  VAULT_SECRET_GENERIC_PUT,
  VAULT_SECRET_GENERIC_GET,
  vaultCompleted
} from './actions';
//]]]
//[[[ Utils
// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);
const createEpic = (actionType, firstOp) => (action$, store) =>
  action$
    .ofType(actionType)
    .mergeMap(action =>
      firstOp(action, store.getState().vaultConfig, store).map(payload =>
        vaultCompleted(payload, action)
      )
    )
    .do(
      completetion =>
        completetion.action.always
          ? completetion.action.always(completetion)
          : undefined !== completetion.payload.errors &&
            completetion.action.fail
            ? completetion.action.fail(completetion)
            : undefined !== completetion.payload.data &&
              completetion.action.success
              ? completetion.action.success(completetion)
              : null
    );
//]]]
//[[[ Auth
export const vaultAuthLookupSelfEpic = createEpic(
  VAULT_AUTH_LOOKUP_SELF,
  (action, vault) => vaultObservable.auth.token.lookupSelf(vault)
);
//]]]
//[[[ Secret
//[[[ Generic
export const vaultSecretGenericListEpic = createEpic(
  VAULT_SECRET_GENERIC_LIST,
  (action, vaultConfig) =>
    vaultObservable.secret.generic.list(action.path, vaultConfig)
);

export const vaultSecretGenericPutEpic = createEpic(
  VAULT_SECRET_GENERIC_PUT,
  (action, vaultConfig) =>
    vaultObservable.secret.generic.put(action.path, vaultConfig, action.kvs)
);

export const vaultSecretGenericGetEpic = createEpic(
  VAULT_SECRET_GENERIC_GET,
  (action, vaultConfig) =>
    vaultObservable.secret.generic.get(action.path, vaultConfig)
);
//]]]
//]]]
export default combineEpics(
  //  vaultAuthSetTokenEpic,
  vaultAuthLookupSelfEpic,
  vaultSecretGenericGetEpic,
  vaultSecretGenericPutEpic,
  vaultSecretGenericListEpic
);
