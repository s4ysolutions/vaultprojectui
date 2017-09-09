describe('Vault', function(){
  it('lookup-self error', function(done){
    const URI = '/v1/auth/token/lookup-self';
    nocker.get(URI).reply(403, { errors: ['Not permitted'] });

    vaultObservable.auth.token.lookupSelf(vault).subscribe(
      function(result) {
        expect(result).to.has.property('errors');
        expect(result.errors.length).to.be.equal(1);
      },
      function (error) { expect.fail('Must not be an error'); },
      function() { done(); },
    );
  });
  it('put value', function(done){
    const URI = '/auth/token/lookup-self';
    nocker.get(URI).reply(403, { errors: ['Not permitted'] });

    vaultObservable.auth.token.lookupSelf(vault).subscribe(
      function(result) {
        expect(result).to.has.property('errors');
        expect(result.errors.length).to.be.equal(1);
      },
      function (error) { expect.fail('Must not be an error'); },
      function() { done(); },
    );
  });
});
