const superagent = require('superagent');
const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/fromPromise');

const _ = o => (console.log(o), o); // eslint-disable-line no-console, no-unused-vars

const wrap = (request, token, data) =>
  Observable.fromPromise(
    request
      .set('X-Vault-Token', token)
      .set('Accept', 'application/json')
      .send(data)
      .then(
        res => ({ data: res.type == 'application/json' ? res.body : res.text }),
        error => ({
          errors: (error.response &&
            error.response.type &&
            (error.response.type === 'application/json'
              ? (error.response.body.errors.length > 0 &&
                  error.response.body.errors) ||
                'Error: ' + error.response.statusCode
              : [error.response.text])) ||
          (error.message && [error.message]) || [error]
        })
      )
  );

module.exports = {
  get: (path, config) =>
    wrap(superagent.get(config.url + '/v1' + path), config.auth.token),
  list: (path, config) =>
    wrap(
      superagent.get(config.url + '/v1' + path + '?list=true'),
      config.auth.token
    ),
  put: (path, config, data) =>
    wrap(superagent.put(config.url + '/v1' + path), config.auth.token, data),
  post: (path, config, data) =>
    wrap(superagent.post(config.url + '/v1' + path), config.auth.token, data)
};
