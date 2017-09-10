require('rxjs/add/operator/do');

const _ = o => (console.log(o), o); // eslint-disable-line no-console, no-unused-vars

describe.skip('Vault.dev', function() {
  before(initVault);
  describe('secret', function(){
    this.timeout(5000);
    before(function(){
      vault.secret.generic.mount = process.env.VAULT_SECRET_GENERIC_MOUNT || '/secret/generic';
    });
    it('put /first {a:1}', function(done){
      const o = vaultObservable.secret.generic.put('/first', vault, { a: 1 });
      o.subscribe(
        function(result){
          expect(result).to.have.property('data');
        },
        function(error){assert.fail(1, 0, error);},
        function(){done();}
      );
    });
    it('get /first', function(done){
      const o = vaultObservable.secret.generic.get('/first', vault);
      o.subscribe(
        function(result){
          expect(result).to.have.property('data').which.to.have.property('data').to.be.eql({ a: 1 });
        },
        function(error){assert.fail(1, 0, error);},
        function(){done();}
      );
    });
    it('put /first/second {a:1}', function(done){
      const o = vaultObservable.secret.generic.put('/first/second', vault, { a: 1 });
      o.subscribe(
        function(result){
          expect(result).to.have.property('data');
        },
        function(error){assert.fail(1, 0, error);},
        function(){done();}
      );
    });
    it('get /first/second', function(done){
      const o = vaultObservable.secret.generic.get('/first/second', vault);
      o.subscribe(
        function(result){
          expect(result).to.have.property('data').which.to.have.property('data').to.be.eql({ a: 1 });
        },
        function(error){assert.fail(1, 0, error);},
        function(){done();}
      );
    });
    it('get /first', function(done){
      const o = vaultObservable.secret.generic.get('/first', vault);
      o.subscribe(
        function(result){
          expect(result).to.have.property('data').which.to.have.property('data').to.be.eql({ a: 1 });
        },
        function(error){assert.fail(1, 0, error);},
        function(){done();}
      );
    });
    it('put /first {b:2}', function(done){
      const o = vaultObservable.secret.generic.put('/first', vault, { b: 2 });
      o.subscribe(
        function(result){
          expect(result).to.have.property('data');
        },
        function(error){assert.fail(1, 0, error);},
        function(){done();}
      );
    });
    it('get /first', function(done){
      const o = vaultObservable.secret.generic.get('/first', vault);
      o.subscribe(
        function(result){
          expect(result).to.have.property('data').which.to.have.property('data').to.be.eql({ b: 2 });
        },
        function(error){assert.fail(1, 0, error);},
        function(){done();}
      );
    });
    it('get /first/second', function(done){
      const o = vaultObservable.secret.generic.get('/first/second', vault);
      o.subscribe(
        function(result){
          expect(result).to.have.property('data').which.to.have.property('data').to.be.eql({ a: 1 });
        },
        function(error){assert.fail(1, 0, error);},
        function(){done();}
      );
    });
    it('put /first [{c:3},{d:4}]', function(done){
      const o = vaultObservable.secret.generic.put('/first', vault, { c: 3,  d: 4 });
      o.subscribe(
        function(result){
          expect(result).to.have.property('data');
        },
        function(error){assert.fail(1, 0, error);},
        function(){done();}
      );
    });
    it('get /first', function(done){
      const o = vaultObservable.secret.generic.get('/first', vault);
      o.subscribe(
        function(result){
          console.log(result.data);
          expect(result).to.have.property('data').which.to.have.property('data').to.be.eql({ c: 3, d: 4 });
        },
        function(error){assert.fail(1, 0, error);},
        function(){done();}
      );
    });
  });
});
