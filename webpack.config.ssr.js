const { server } = require("universal-webpack/config");
const universal_settings = require("./universal-webpack-settings");
const webpack_configuration = require("./webpack.config");

const config = server(webpack_configuration, universal_settings);

require("./webpack.log.js")(config);
module.exports = config;
