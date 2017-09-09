const gate = require('../gate');
const _ = o => (console.log(o), o);// eslint-disable-line no-console, no-unused-vars

module.exports = {
  get: (path, config)=> gate.get(config.secret.generic.mount + path, config),
  put: (path, config, kvs)=> gate.put(config.secret.generic.mount + path, config, kvs),
  post: (path, config, data)=> gate.post(config.secret.generic.mount + path, config, data),
  list: (path, config)=> gate.list(config.secret.generic.mount + path, config)
};
