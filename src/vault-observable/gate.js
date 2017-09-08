const superagent = require('superagent');
const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/of');
require('rxjs/add/observable/fromPromise');
require('rxjs/add/observable/if');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/do');

const _ = o => (console.log(o), o);

const wrap = (request, token, data) =>
  Observable.fromPromise( request
                       .set('X-Vault-Token', token)
                       .set('Accept', 'application/json')
                       .send(data)
                       .then(res => ({
                         data: res.type == 'application/json' ? res.body : res.text
                       }))
                         .catch(error => ({
                           errors: error.response && error.response.xhr && (
                             (error.response.type === 'application/json') ? error.response.body.errors : [error.response.text])
                         || error.message && [ error.message ]
                         || [error] })));

module.exports = {
  get: (path, config) => wrap(superagent.get(config.url + '/v1' + path), config.auth.token),
  list: (path, config) => wrap(superagent.list(vault.url + '/v1' + path), config.auth.token),
  put: (path, config, data) =>wrap(superagent.put(vault.url + '/v1' + path), config.auth.token.data),
  post: (path, config, data) =>wrap(superagent.post(vault.url + '/v1' + path), config.auth.token.data)
};
