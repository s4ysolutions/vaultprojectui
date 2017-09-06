import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import vaultObservable from './vault-observable';

import {
  actionNoop,
  VAULT_AUTH_LOOKUP_SELF,
  VAULT_AUTH_LOOKUP_SELF_PAYLOAD,
  VAULT_AUTH_SET_TOKEN,
  vaultAuthLookupSelf,
  vaultAuthLookupSelfPayload,
  vaultError }
  from './actions';

const _ = o => (console.log(o), o);

/*
export const vaultAuthSetTokenEpic = (action$) => 
  action$.ofType(VAULT_AUTH_SET_TOKEN)
  .mapTo(vaultAuthLookupSelf());
*/
export const vaultAuthLookupSelfEpic = (action$, store) => 
  action$.ofType(VAULT_AUTH_LOOKUP_SELF)
  .mergeMap(
    action =>
      vaultObservable.auth.token.lookupSelf(store.getState().vault)
      .map(payload=>vaultAuthLookupSelfPayload(payload, action.success))
      .catch(error=>Observable.of(vaultError(error)))
  ); 

export const vaultAuthLookupSelfPayloadEpic = (action$, store) => 
  action$.ofType(VAULT_AUTH_LOOKUP_SELF_PAYLOAD)
  .do(action=>action.success(action))
  .mapTo(actionNoop());

export default combineEpics(
//  vaultAuthSetTokenEpic,
  vaultAuthLookupSelfEpic,
  vaultAuthLookupSelfPayloadEpic
);
