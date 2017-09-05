import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActionsObservable } from 'redux-observable';
import { vaultAuthLookupSelf, VAULT_AUTH_LOOKUP_SELF_PAYLOAD, VAULT_ERROR, vaultSetURI } from '../src/actions';
import { vaultAuthLookupSelfEpic } from '../src/epics';

const _ = o => (console.log(o), o);

describe('Epics', function(){
  let store;
  beforeEach(()=> {
    store = storeFactory();
  });
  afterEach(() => {
    nock.cleanAll();
  });
  it('lookup-self token', function(done){
    const URI = '/v1/auth/token/lookup-self';
    nocker.get(URI).reply(200, {
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
      a=>expect(a).to.have.property('type', VAULT_AUTH_LOOKUP_SELF_PAYLOAD),
      ()=>expect.fail,
      done
    );
  });
  it('lookup-self error', function(done){
    const URI = '/v1/auth/token/lookup-self';
    nocker.get(URI).reply(403, { errors: ['permission deinied'] });
    rootEpic(ActionsObservable.of(vaultAuthLookupSelf()), store)
    .subscribe( 
      a=>expect(a).to.have.property('type', VAULT_ERROR),
      ()=>expect.fail,
      done
    );
  });
  it.only('lookup-self DNS error', function(done){
    this.timeout(15000);
    store.dispatch(vaultSetURI('http://nonexisting.example'));
    const URI = '/v1/auth/token/lookup-self';
    nocker.get(URI).reply(403, { errors: ['permission deinied'] });
    rootEpic(ActionsObservable.of(vaultAuthLookupSelf()), store)
    .subscribe( 
      a=>expect(a).to.have.property('type', VAULT_ERROR),
      ()=>expect.fail,
      done
    );
  });
});
