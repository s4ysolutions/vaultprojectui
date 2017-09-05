import { vaultSetURI } from '../src/actions';

describe('Sync redux', function(){
  let store;
  beforeEach(()=> {
    store = storeFactory();
  });
  describe('Vault', function(){
    it('Set URI', function(){
      store.dispatch(vaultSetURI('test'));
      expect(store.getState().vault.uri).to.be.equal('test');
    });
  });
});
