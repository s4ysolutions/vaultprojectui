import { vaultSetURL } from '../src/actions';

describe('Sync redux', function(){
  let store;
  beforeEach(()=> {
    store = storeFactory();
  });
  describe('Vault', function(){
    it('Set URL', function(){
      store.dispatch(vaultSetURL('test'));
      expect(store.getState().vault.url).to.be.equal('test');
    });
  });
});
