const { client } = require("universal-webpack/config");
const universal_settings = require("./universal-webpack-settings");
const webpack_configuration = require("./webpack.config");

const config = client(webpack_configuration, universal_settings);
console.log(config);
console.log(config.plugins);
for (var i = 0;i < config.module.rules.length;i++){
  console.log(config.module.rules[i]);
}

module.exports = config;
