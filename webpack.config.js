const path = require("path");
const merge = require("webpack-merge");
const webpack = require ("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const PATH_SRC = path.resolve(__dirname, "src");
const PATH_DIST = path.resolve(__dirname, "dist");

const base = {
  entry: PATH_SRC+"/index.jsx",
  output: {
    filename: "[name].[hash].js",
    path: PATH_DIST
  },
  module: {
    rules: [
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
        }, {
          loader: "eslint-loader"
        }],
        include: PATH_SRC
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new CleanWebpackPlugin([PATH_DIST], {
      verbose: true,
      dry: false
    }),
  ]
};

let config;

switch (process.env.npm_lifecycle_event) {
  case "static":
    config = merge(
      base,
      {
        entry: [
          "babel-polyfill", PATH_SRC+"/index.jsx"
        ],
        output: {
          publicPath: ""
        },
        plugins: [
          new ExtractTextPlugin("styles.css"),
          new webpack.optimize.UglifyJsPlugin({
            sourceMap: "source-map"
          }),
          new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
          }),
          new CompressionPlugin({  
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 1024,
            minRatio: 0
          }),
          new HtmlWebpackPlugin({
            appMountId: "reactMount",
            template: PATH_SRC+"/index.ejs",
            filename: PATH_DIST+"/index.html",
            title: "HashiCorp Vault",
            options: {
              mode: "production"
            }
          })
        ]
      });
    break;
  default:
    config = base;
}

module.exports = config;
