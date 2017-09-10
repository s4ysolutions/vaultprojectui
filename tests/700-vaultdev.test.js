require('rxjs/add/operator/do');

const _ = o => (console.log(o), o); // eslint-disable-line no-console, no-unused-vars

describe.skip('Vault.dev', function() {
  before(initVault);
  describe('secret', function() {
    this.timeout(5000);
    before(function() {});
    it('put /first {a:1}', function(done) {
      const o = vaultObservable.secret.generic.put('/first', vaultConfig, {
        a: 1
      });
      o.subscribe(
        function(result) {
          console.log(result.data);
          expect(result).to.have.property('data');
        },
        function(error) {
          assert.fail(1, 0, error);
        },
        function() {
          done();
        }
      );
    });
    it('get /first', function(done) {
      const o = vaultObservable.secret.generic.get('/first', vaultConfig);
      o.subscribe(
        function(result) {
          expect(result)
            .to.have.property('data')
            .which.to.have.property('data')
            .to.be.eql({ a: 1 });
        },
        function(error) {
          assert.fail(1, 0, error);
        },
        function() {
          done();
        }
      );
    });
    it('put /first/second {a:1}', function(done) {
      const o = vaultObservable.secret.generic.put(
        '/first/second',
        vaultConfig,
        {
          a: 1
        }
      );
      o.subscribe(
        function(result) {
          expect(result).to.have.property('data');
        },
        function(error) {
          assert.fail(1, 0, error);
        },
        function() {
          done();
        }
      );
    });
    it('get /first/second', function(done) {
      const o = vaultObservable.secret.generic.get(
        '/first/second',
        vaultConfig
      );
      o.subscribe(
        function(result) {
          expect(result)
            .to.have.property('data')
            .which.to.have.property('data')
            .to.be.eql({ a: 1 });
        },
        function(error) {
          assert.fail(1, 0, error);
        },
        function() {
          done();
        }
      );
    });
    it('get /first', function(done) {
      const o = vaultObservable.secret.generic.get('/first', vaultConfig);
      o.subscribe(
        function(result) {
          expect(result)
            .to.have.property('data')
            .which.to.have.property('data')
            .to.be.eql({ a: 1 });
        },
        function(error) {
          assert.fail(1, 0, error);
        },
        function() {
          done();
        }
      );
    });
    it('put /first {b:2}', function(done) {
      const o = vaultObservable.secret.generic.put('/first', vaultConfig, {
        b: 2
      });
      o.subscribe(
        function(result) {
          expect(result).to.have.property('data');
        },
        function(error) {
          assert.fail(1, 0, error);
        },
        function() {
          done();
        }
      );
    });
    it('get /first', function(done) {
      const o = vaultObservable.secret.generic.get('/first', vaultConfig);
      o.subscribe(
        function(result) {
          expect(result)
            .to.have.property('data')
            .which.to.have.property('data')
            .to.be.eql({ b: 2 });
        },
        function(error) {
          assert.fail(1, 0, error);
        },
        function() {
          done();
        }
      );
    });
    it('get /first/second', function(done) {
      const o = vaultObservable.secret.generic.get(
        '/first/second',
        vaultConfig
      );
      o.subscribe(
        function(result) {
          expect(result)
            .to.have.property('data')
            .which.to.have.property('data')
            .to.be.eql({ a: 1 });
        },
        function(error) {
          assert.fail(1, 0, error);
        },
        function() {
          done();
        }
      );
    });
    it('put /first [{c:3},{d:4}]', function(done) {
      const o = vaultObservable.secret.generic.put('/first', vaultConfig, {
        c: 3,
        d: 4
      });
      o.subscribe(
        function(result) {
          expect(result).to.have.property('data');
        },
        function(error) {
          assert.fail(1, 0, error);
        },
        function() {
          done();
        }
      );
    });
    it('get /first', function(done) {
      const o = vaultObservable.secret.generic.get('/first', vaultConfig);
      o.subscribe(
        function(result) {
          expect(result)
            .to.have.property('data')
            .which.to.have.property('data')
            .to.be.eql({ c: 3, d: 4 });
        },
        function(error) {
          assert.fail(1, 0, error);
        },
        function() {
          done();
        }
      );
    });
    it('list /', function(done) {
      const o = vaultObservable.secret.generic.list('/', vaultConfig);
      o.subscribe(
        function(result) {
          console.log(result.data);
          expect(result)
            .to.have.property('data')
            .which.to.have.property('data')
            .to.be.eql({ keys: ['first', 'first/', 'test', 'test/'] });
        },
        function(error) {
          assert.fail(1, 0, error);
        },
        function() {
          done();
        }
      );
    });
  });
});
