const superagent = require('superagent');
const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/of');
require('rxjs/add/observable/fromPromise');
require('rxjs/add/observable/if');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/do');

const _ = o => (console.log(o), o);

module.exports = {
  get: (path, vault) =>
    Observable.fromPromise( 
      superagent.get(vault.uri + '/v1' + path)
                         .set('X-Vault-Token', vault.auth.token)
                         .set('Accept', 'application/json')
    )
    .map(res => res.type == 'application/json' ? res.body : res.text)
};
