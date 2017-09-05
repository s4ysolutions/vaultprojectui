describe('Vault', function(){
  it('lookup-self error', function(done){
    const URI = '/v1/auth/token/lookup-self';
    nocker.get(URI).reply(403, { errors: ['Not permitted'] });

    vaultObservable.auth.token.lookupSelf(vault).subscribe(
      function(data) { expect.fail('Must not be any data'); },
      function(error) { done(); },
      function () { expect.fail('Must be an error'); }
    );
  });
});
