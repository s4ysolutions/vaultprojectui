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
} from "../src/actions";

describe("Sync Redux", function() {
  let store;
  beforeEach(function(done) {
    store = storeFactory();
    done();
  });
  describe("Vault", function() {
    it("Set URL", function() {
      store.dispatch(vaultSetURL("test"));
      expect(store.getState().vaultConfig.url).to.be.equal("test");
    });
    it("Set Token", function() {
      store.dispatch(vaultAuthSetToken("test"));
      expect(store.getState().vaultConfig.auth.token).to.be.equal("test");
    });
    it("KV init", function(done) {
      const state = store.getState();
      const kvs = state.kvs;
      expect(kvs.kvs).to.be.eql({});
      expect(kvs.editingKey).to.be.equal(false);
      expect(kvs.addingAt).to.be.equal(0);
      done();
    });
    it("KV set {a, b, c}", function(done) {
      store.dispatch(
        vaultCompleted(
          { data: { data: { a: 1, b: 2, c: 3 } } },
          vaultSecretGenericGet()
        )
      );
      const kvs = store.getState().kvs;
      expect(kvs.kvs).to.be.eql({ a: 1, b: 2, c: 3 });
      expect(kvs.addingAt).to.be.eql(2);
      expect(kvs.editingKey).to.be.equal(false);
      done();
    });
    it("KV {a, b, c} adding at 0", function(done) {
      store.dispatch(
        vaultCompleted(
          { data: { data: { a: 1, b: 2, c: 3 } } },
          vaultSecretGenericGet()
        )
      );
      store.dispatch(kvStartAddAt(0));
      const kvs = store.getState().kvs;
      expect(kvs.kvs).to.be.eql({ a: 1, b: 2, c: 3 });
      expect(kvs.addingAt).to.be.eql(0);
      expect(kvs.editingKey).to.be.equal(false);
      done();
    });
    it("KV {a, b, c} adding at 1", function(done) {
      store.dispatch(
        vaultCompleted(
          { data: { data: { a: 1, b: 2, c: 3 } } },
          vaultSecretGenericGet()
        )
      );
      store.dispatch(kvStartAddAt(1));
      const kvs = store.getState().kvs;
      expect(kvs.kvs).to.be.eql({ a: 1, b: 2, c: 3 });
      expect(kvs.addingAt).to.be.eql(1);
      expect(kvs.editingKey).to.be.equal(false);
      done();
    });
    it("KV {a, b, c} adding at 2", function(done) {
      store.dispatch(
        vaultCompleted(
          { data: { data: { a: 1, b: 2, c: 3 } } },
          vaultSecretGenericGet()
        )
      );
      store.dispatch(kvStartAddAt(2));
      const kvs = store.getState().kvs;
      expect(kvs.kvs).to.be.eql({ a: 1, b: 2, c: 3 });
      expect(kvs.addingAt).to.be.eql(2);
      expect(kvs.editingKey).to.be.equal(false);
      done();
    });
    it("KV {a, b, c} adding at 3", function(done) {
      store.dispatch(
        vaultCompleted(
          { data: { data: { a: 1, b: 2, c: 3 } } },
          vaultSecretGenericGet()
        )
      );
      store.dispatch(kvStartAddAt(3));
      const kvs = store.getState().kvs;
      expect(kvs.kvs).to.be.eql({ a: 1, b: 2, c: 3 });
      expect(kvs.addingAt).to.be.eql(2);
      expect(kvs.editingKey).to.be.equal(false);
      done();
    });
  });
});
