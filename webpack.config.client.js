const { client } = require("universal-webpack/config");
const universal_settings = require("./universal-webpack-settings");
const webpack_configuration = require("./webpack.config");

console.log(webpack_configuration);
console.log(webpack_configuration.plugins);
for (var i=0;i<webpack_configuration.module.rules.length;i++){
  console.log(webpack_configuration.module.rules[i]);
}

module.exports = client(webpack_configuration, universal_settings);
