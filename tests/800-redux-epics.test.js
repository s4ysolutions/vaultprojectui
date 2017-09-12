const {
  vaultSecretGenericList,
  vaultSecretGenericPut,
  vaultSetURL,
  vaultAuthSetToken,
  VAULT_SECRET_GENERIC_LIST
} = require('../src/actions');

describe('Epics Redux', function() {
  let store;
  before(function() {
    initVault();
    nock.disableNetConnect();
  });
  beforeEach(() => {
    store = storeFactory();
    store.dispatch(vaultSetURL(vaultConfig.url));
    store.dispatch(vaultAuthSetToken(vaultConfig.auth.token));
  });
  describe('Vault', function() {
    it('LIST secret/generic', function(done) {
      nocker.get('/v1/secret/?list=true').reply(200, {
        request_id: '87da5344-6e45-7c11-7c13-0f904c240e8e',
        lease_id: '',
        renewable: false,
        lease_duration: 0,
        data: { keys: ['first', 'second'] },
        wrap_info: null,
        warnings: null,
        auth: null
      });
      store.dispatch(
        vaultSecretGenericList('/', action => {
          expect(action)
            .to.have.property('payload')
            .which.have.property('data')
            .which.have.property('data')
            .which.have.property('keys');
          expect(action.payload.data.data.keys).to.be.eql(['first', 'second']);
          setTimeout(() => {
            const folders = store.getState().vaultState.cache.secret.generic
              .folders;
            //console.log(folders);
            expect(folders['/']).to.be.eql(['first', 'second']);
            done();
          }, 0);
        })
      );
    });
    it('PUT secret/generic folder', function(done) {
      nocker.put('/v1/secret/x').reply(204, '');
      store.dispatch(
        vaultSecretGenericPut('/x', { ttl: '1m' }, action => {
          console.log(action);
          expect(action)
            .to.have.property('payload')
            .which.have.property('data', '');
          setTimeout(() => {
            const folders = store.getState().vaultState.cache.secret.generic
              .folders;
            console.log(folders);
            expect(folders['/']).to.be.eql(['x']);
            done();
          }, 0);
        })
      );
    });
  });
});
