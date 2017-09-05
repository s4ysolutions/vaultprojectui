import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';

import vaultObservable from './vault-observable';

import {
  VAULT_AUTH_LOOKUP_SELF,
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
    () =>vaultObservable.auth.token.lookupSelf(store.getState().vault)
  )
.map(vaultAuthLookupSelfPayload)
.catch(error=>Observable.of(vaultError(error))); 

export default combineEpics(
//  vaultAuthSetTokenEpic,
  vaultAuthLookupSelfEpic
);
