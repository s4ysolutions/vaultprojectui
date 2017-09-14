import {
  vaultSetURL,
  vaultAuthSetToken,
  vaultCompleted,
  vaultSecretGenericGet,
  kvStartAddAt,
  kvStartEditOf,
  kvDeleteOf,
  kvCancelAdd,
  kvCompleteDelete
} from '../src/actions';

describe.only('Sync Redux', () => {
  let store;
  beforeEach((done) => {
    store = storeFactory();
    done();
  });
  describe('Vault', () => {
    it('Set URL', () => {
      store.dispatch(vaultSetURL('test'));
      expect(store.getState().vaultConfig.url).to.be.equal('test');
    });
    it('Set Token', () => {
      store.dispatch(vaultAuthSetToken('test'));
      expect(store.getState().vaultConfig.auth.token).to.be.equal('test');
    });
  });
  describe('KVs Editor', () => {
    const set1 = {
      a: 1,
      b: 2,
      c: 3
    };
    it('init', (done) => {
      const state = store.getState();
      const kvs = state.kvsEditor;
      expect(kvs.kvs).to.be.eql({});
      expect(kvs.editingOf).to.be.equal(false);
      expect(kvs.addingAt).to.be.equal(0);
      done();
    });
    it(`set ${set1}`, (done) => {
      store.dispatch(vaultCompleted({ data: { data: set1 } }, vaultSecretGenericGet()));
      const kvs = store.getState().kvsEditor;
      expect(kvs.kvs).to.be.eql(set1);
      expect(kvs.addingAt).to.be.eql(Object.keys(set1).length - 1);
      expect(kvs.editingOf).to.be.equal(false);
      done();
    });
    it('adding at 0', (done) => {
      store.dispatch(vaultCompleted({ data: { data: set1 } }, vaultSecretGenericGet()));
      store.dispatch(kvStartAddAt(0));
      const kvs = store.getState().kvsEditor;
      expect(kvs.kvs).to.be.eql(set1);
      expect(kvs.addingAt).to.be.eql(0);
      expect(kvs.editingOf).to.be.equal(false);
      done();
    });
    it('adding at 1', (done) => {
      store.dispatch(vaultCompleted({ data: { data: set1 } }, vaultSecretGenericGet()));
      store.dispatch(kvStartAddAt(1));
      const kvs = store.getState().kvsEditor;
      expect(kvs.kvs).to.be.eql(set1);
      expect(kvs.addingAt).to.be.eql(1);
      expect(kvs.editingOf).to.be.equal(false);
      done();
    });
    it('KV {a, b, c} adding at last', (done) => {
      store.dispatch(vaultCompleted({ data: { data: set1 } }, vaultSecretGenericGet()));
      store.dispatch(kvStartAddAt(Object.keys(set1).length - 1));
      const kvs = store.getState().kvsEditor;
      expect(kvs.kvs).to.be.eql(set1);
      expect(kvs.addingAt).to.be.eql(Object.keys(set1).length - 1);
      expect(kvs.editingOf).to.be.equal(false);
      done();
    });
    it('KV {a, b, c} adding beyond last', (done) => {
      store.dispatch(vaultCompleted({ data: { data: set1 } }, vaultSecretGenericGet()));
      store.dispatch(kvStartAddAt(Object.keys(set1).length));
      const kvs = store.getState().kvsEditor;
      expect(kvs.kvs).to.be.eql(set1);
      expect(kvs.addingAt).to.be.eql(Object.keys(set1).length - 1);
      expect(kvs.editingOf).to.be.equal(false);
      done();
    });
  });
});
