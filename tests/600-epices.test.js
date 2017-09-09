import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActionsObservable } from 'redux-observable';
import {
  vaultAuthLookupSelf,
  vaultSecretGenericGet,
  vaultSecretGenericPut,
  vaultSetURL,
  VAULT_COMPLETED,
  VAULT_ERROR
} from '../src/actions';

import { vaultAuthLookupSelfEpic } from '../src/epics';

const _ = o => (console.log(o), o);

describe('Epics', function(){
  let store;
  beforeEach(()=> {
    nock.cleanAll();
    store = storeFactory();
  });
  it('lookup-self token', function(done){
    const URL = '/v1/auth/token/lookup-self';
    nocker.get(URL).reply(200, {
      'data': {
        'id': 'ClientToken',
        'policies': [
          'web', 
          'stage'
        ],
        'path': 'auth/github/login',
        'meta': {
          'user': 'armon', 
          'organization': 'hashicorp'
        },
        'display_name': 'github-armon',
        'num_uses': 0,
      }
    });

    rootEpic(ActionsObservable.of(vaultAuthLookupSelf()), store)
    .subscribe( 
      a=>{
        expect(a).to.have.property('type', VAULT_COMPLETED),
        expect(a).to.have.property('payload').which.to.have.property('data');
      },
      (error)=>assert.fail(0, 1, error),
      done
    );
  });
  it('lookup-self error', function(done){
    const URL = '/v1/auth/token/lookup-self';
    nocker.get(URL).reply(403, { errors: ['permission deinied'] });
    rootEpic(ActionsObservable.of(vaultAuthLookupSelf()), store)
    .subscribe( 
      a=>{
        expect(a).to.have.property('type', VAULT_COMPLETED);
        expect(a).to.have.property('payload').which.to.have.property('errors');
      },
      (error)=>assert.fail(0, 1, error),
      done
    );
  });
  it('lookup-self DNS error', function(done){
    this.timeout(15000);
    store.dispatch(vaultSetURL('http://samele.nonexisting'));
    const URI = '/v1/auth/token/lookup-self';
    nocker.get(URI).reply(403, { errors: ['permission deinied'] });
    rootEpic(ActionsObservable.of(vaultAuthLookupSelf()), store)
    .subscribe( 
      a=>{
        expect(a).to.have.property('type', VAULT_COMPLETED);
        expect(a).to.have.property('payload').which.to.have.property('errors');
      },
      (error)=>assert.fail(0, 1, error),
      done
    );
  });
  it.only('secret read', function(done){
    const URL = '/v1/auth/secret/foo';
    nocker.get(URL).reply(200, {
      'data': {
        {a: 1}
      }
    });
    rootEpic(ActionsObservable.of(vaultSecretGenericGet('/foo')), store)
    .subscribe( 
      a=>{
        expect(a).to.have.property('type', VAULT_COMPLETED),
        expect(a).to.have.property('payload').which.to.have.property('data').which.to.have.property('data',{a:1});
      },
      (error)=>assert.fail(0, 1, error),
      done
    );
  }
});
