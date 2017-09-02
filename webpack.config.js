const path = require("path");
const merge = require("webpack-merge");
const webpack = require ("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const PATH_SRC = path.resolve(__dirname, "src");
const PATH_DIST = path.resolve(__dirname, "dist");

const rule_babel_client_dev =
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: [
              ["env", {
                "modules": false,
                "targets": { "browsers": ["last 2 versions", "safari >= 7"] },
                useBuiltIns: true
              }],
              "react"
            ],
            plugins: [
              "babel-plugin-transform-runtime",
              "transform-async-to-generator",
              "transform-object-rest-spread",
              "react-hot-loader/babel"
            ]
          }
        }],
        include: PATH_SRC
      };

const rule_babel_client_prod =
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: [
              ["env", {
                "modules": false,
                "targets": { "browsers": ["last 2 versions", "safari >= 7"] },
                useBuiltIns: true
              }],
              "react"
            ],
            plugins: [
              "babel-plugin-transform-runtime",
              "transform-async-to-generator",
              "transform-object-rest-spread",
            ]
          }
        }],
        include: PATH_SRC
      };

const rule_babel_server =
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: [
              ["env", {
                modules: "commonjs",
                targets: { "node": "current", uglify: true },
                useBuiltIns: true
              }],
            ],
            plugins: [
              "transform-object-rest-spread"
            ]
          }
        }],
        include: PATH_SRC
      };

const rule_eslint=
          { test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
              loader: "eslint-loader"
            }],
            include: PATH_SRC
          };

const base = {
};

let config=base;

const ENV=process.env.npm_lifecycle_event || process.env.WEBPACK_ENV || "start";
console.log({ ENV });

// Client any
if (ENV==="dev:client" || ENV==="build:client" ){
  config = merge(
    config,
    {
      entry: path.join(PATH_SRC, "/index.jsx"),
      output: {
        filename: "index.js",
        path: PATH_DIST
      },
      resolve: {
        extensions: [".js", ".jsx"]
      },
      plugins: [
        new HtmlWebpackPlugin({
          appMountId: "reactMount",
          template: PATH_SRC+"/index.ejs",
          filename: "index.html",
          title: "HashiCorp Vault",
          minify: {}
        }),
        new CompressionPlugin({  
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 1024,
          minRatio: 0
        }),
      ]
    }
  );
}
// client dev
if (ENV==="dev:client" ){
  config = merge(
    config,
    {
      module: {
        rules: [ rule_babel_client_dev, rule_eslint ],
      }
    }
  );
}
// client production
if (ENV==="build:client" ){
  config = merge(
    config,
    {
      module: {
        rules: [ rule_babel_client_prod, rule_eslint ],
      },
      plugins: [
        new ExtractTextPlugin("styles.css"),
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify("production")
        })
      ]
    }
  );
}

// Server any
if (ENV.indexOf("server")>=0  || ENV==="start"){
  config = merge(
    config,
    {
      entry: path.join(PATH_SRC, "/server.js"),
      resolve: {
        extensions: [".js", ".jsx"]
      },
      module: {
        rules: [ rule_babel_server ]
      },
      output: {
        filename: "server.js",
        path: PATH_DIST
      },
    });
}
// Server produciton
if ( ENV==="build:server"  || ENV=="start"){
  config = merge(
    config,
    {
      entry: path.join(PATH_SRC, "/server.js"),
      module: {
        rules: [ rule_eslint ]
      },
      output: {
        filename: "server.js"
      },
      plugins: [
      ]
    });
}
// Any produciton
if (ENV==="build:client" || ENV=="build:server" || ENV=="start"){
  config = merge(
    config,
    {
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: "source-map"
        }),
      ]
    }
  );
}

module.exports = config;
