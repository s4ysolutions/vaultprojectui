import startServer from "universal-webpack/server";
import universal_settings from "../universal-webpack-settings";
import webpack_configuration from "../webpack.config";

startServer(webpack_configuration, universal_settings);
