import { vaultSetURL, vaultAuthSetToken } from '../src/actions';

describe('Sync Redux', function() {
  let store;
  beforeEach(() => {
    store = storeFactory();
  });
  describe('Vault', function() {
    it('Set URL', function() {
      store.dispatch(vaultSetURL('test'));
      expect(store.getState().vaultConfig.url).to.be.equal('test');
    });
    it('Set Token', function() {
      store.dispatch(vaultAuthSetToken('test'));
      expect(store.getState().vaultConfig.auth.token).to.be.equal('test');
    });
  });
});
