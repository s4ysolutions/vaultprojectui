const { server } = require("universal-webpack/config");
const universal_settings = require("./universal-webpack-settings");
const webpack_configuration = require("./webpack.config");

const config = module.exports = server(
  webpack_configuration,
  Object.assign({}, universal_settings, { chunk_info_filename: "assets/webpack-chunks.json" }));

console.log(config);
console.log(config.plugins);
for (var i = 0;i < config.module.rules.length;i++){
  console.log(config.module.rules[i]);
}

module.exports = config;
