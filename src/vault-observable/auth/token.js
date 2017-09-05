const gate = require('../gate');
module.exports = {
  lookupSelf: vault => gate.get('/auth/token/lookup-self', vault)
};
