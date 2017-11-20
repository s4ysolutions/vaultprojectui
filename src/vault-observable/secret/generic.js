const gate = require('../gate');
// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);

module.exports = {
  get: (path, config) => gate.get(config.secret.generic.mount + path, config),
  put: (path, config, kvs) =>
    gate.put(config.secret.generic.mount + path, config, kvs),
  post: (path, config, data) =>
    gate.post(config.secret.generic.mount + path, config, data),
  list: (path, config) => gate.list(config.secret.generic.mount + path, config)
};
