const startServer = require("universal-webpack/server");
const universal_settings = require("../universal-webpack-settings");
const webpack_configuration = require("../webpack.config");

startServer(
  webpack_configuration,
  Object.assign({}, universal_settings, { chunk_info_filename: "../static/webpack-chunks.json" })
);
