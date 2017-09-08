const gate = require('../gate');

module.exports = {
  get: (vault, path)=> gate.get('/secret' + path, vault),
  put: (vault, path, data)=> gate.put('/secret' + path, vault, data),
  post: (vault, path, data)=> gate.post('/secret' + path, vault, data),
  list: (vault, path)=> gate.list('/secret' + path, vault)
};
