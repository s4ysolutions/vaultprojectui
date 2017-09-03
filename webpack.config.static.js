const { client } = require("universal-webpack/config");
const universal_settings = require("./universal-webpack-settings");
const webpack_configuration = require("./webpack.config");

const config = client(webpack_configuration, universal_settings);
require("./webpack.log.js")(config);

module.exports = config;
