//[[[ import & consts
const path = require('path');

const merge = require('webpack-merge');
const webpack = require ('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PATH_SRC = path.resolve(__dirname, 'src');
const PATH_NPM_CSS = [
  path.resolve(__dirname, 'node_modules', 'typeface-roboto'),
  path.resolve(__dirname, 'node_modules', 'normalize.css')
];
const PATH_CSS = PATH_NPM_CSS.concat(PATH_SRC);
const PATH_NPM_FONTS = [
  path.resolve(__dirname, 'node_modules', 'typeface-roboto', 'files')
];
const PATH_DIST = path.resolve(__dirname, 'dist');
const PATH_DIST_STATIC = path.resolve(PATH_DIST, 'static');
const PATH_DIST_SSR = path.resolve(PATH_DIST, 'ssr');

const ENV = process.env.npm_lifecycle_event || process.env.WEBPACK_ENV || 'start';
console.log({ ENV });
//]]]
//[[[ rules
/*
const rule_ejs = {
  test: /\.ejs$/,
  use: [{
    loader: "file-loader",
    options: { outputPath: PATH_DIST_SSR, name: "[name].[ext]", emitFile: true }
  }],
  include: PATH_SRC
};
*/
const rule_babel_static_dev = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    options: {
      presets: [
        ['env', {
          'modules': false,
          'targets': { 'browsers': ['last 2 versions', 'safari >= 7'] },
          useBuiltIns: true
        }],
        'react'
      ],
      plugins: [
        'babel-plugin-transform-runtime',
        'transform-async-to-generator',
        'transform-object-rest-spread',
        'react-hot-loader/babel'
      ]
    }
  }],
  include: PATH_SRC
};

const rule_babel_static_prod = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    options: {
      presets: [
        ['env', {
          'modules': false,
          'targets': { 'browsers': ['last 2 versions', 'safari >= 7'] },
          useBuiltIns: true
        }],
        'react'
      ],
      plugins: [
        'babel-plugin-transform-runtime',
        'transform-async-to-generator',
        'transform-object-rest-spread'
      ]
    }
  }],
  include: PATH_SRC
};
// less babelize
const rule_babel_server = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    options: {
      presets: [
        ['env', {
          modules: 'commonjs',
          targets: {
            'node': 'current',
            'uglify': true,
          },
          useBuiltIns: true
        }],
        'react'
      ],
      plugins: [
        'babel-plugin-transform-runtime',
        'transform-async-to-generator',
        'transform-object-rest-spread'
      ]
    }
  }],
  include: PATH_SRC
};

const rule_eslint = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [{
    loader: 'eslint-loader'
  }],
  include: PATH_SRC
};

const rule_css_embed = {
  test: /\.css$/,
  use: [ 'style-loader', 'css-loader' ],
  include: PATH_CSS
  
};

const rule_css_extract = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
  include: PATH_CSS
};

const rule_woff = {
  // Match woff2 in addition to patterns like .woff?v=1.1.1.
  test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
  use: [{
    loader: 'file-loader',
    options: {
      mimetype: 'application/font-woff',
      name: 'fonts/[name].[ext]'
      // node_modules/...
      //name: "[path][name].[ext]"
    }
  }],
  include: PATH_NPM_FONTS
};
//]]]
// [[[ Any
const base = {
  module: {
    rules: [ rule_woff ]
  }
};
let config = base;
///]]]
// [[[ Any produciton (eslint)
if (ENV.indexOf('build') >= 0  || ENV == 'start'){
  config = merge(
    config,
    {
      module: {
        rules: [ rule_eslint ]
      },
    }
  );
}
// ]]]
// [[[ Static any
if (ENV === 'dev:static' || ENV === 'build:static' ){
  config = merge(
    config,
    {
      output: {
        filename: '[name].[hash].js',
        path: PATH_DIST_STATIC
      },
      resolve: {
        extensions: ['.js', '.jsx']
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: PATH_SRC + '/index.ejs',
          // Must have to avoid duplicate AppContainer
          inject: false,
          hash: true,
          showErrors: true,
          appMountId: 'reactMount',
          title: 'HashiCorp Vault',
          minify: {}
        }),
        new CompressionPlugin({  
          asset: '[file].gz',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 1024,
          minRatio: 0
        }),
      ]
    }
  );
}
// ]]]
// [[[ Static dev
if (ENV === 'dev:static' ){
  config = merge(
    config,
    {
      entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        path.resolve(PATH_SRC, 'index.jsx')
      ],
      output: {
        publicPath: 'http://localhost:8080/'
      },
      devtool: 'inline-source-map',
      devServer: {
        hot: true,
        host: 'localhost',
        port: 8080,
        // to avoid  404
        historyApiFallback: true
      },
      module: {
        rules: [ rule_babel_static_dev ],
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
      ]
    }
  );
}
// ]]]
// [[[ Static production
if (ENV === 'build:static' ){
  config = merge(
    config,
    {
      entry: path.resolve(PATH_SRC, 'index.jsx'),
      module: {
        rules: [ rule_babel_static_prod, rule_css_extract],
      },
      plugins: [
        new ExtractTextPlugin('styles.[contenthash].css'),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin([PATH_DIST_STATIC], {
          verbose: true,
          dry: false
        })
      ]
    }
  );
}
// ]]]
//[[[ Server any
if (ENV.indexOf('ssr') >= 0 || ENV === 'start'){
  config = merge(
    config,
    {
      entry: path.resolve(PATH_SRC, 'server.js'),
      resolve: {
        extensions: ['.js', '.jsx']
      },
      module: {
        rules: [ rule_babel_server/*, rule_ejs*/]
      },
      output: {
        filename: 'index.js',
        path: PATH_DIST_SSR
      },
      plugins: [
        new CopyWebpackPlugin([
          { from: 'src/index.ejs' }
        ])
      ]
    });
}
//]]]
// [[[ SSR dev
if ( ENV === 'dev:ssr' || ENV === 'watch:webpack:ssr' ){
  config = merge(
    config,
    {
      module: {
        rules: [ rule_css_embed ]
      }
    });
}
//]]]
// [[[ SSR production
if ( ENV === 'build:ssr'  || ENV == 'start'){
  config = merge(
    config,
    {
      plugins: [
        new CleanWebpackPlugin([PATH_DIST_SSR], {
          verbose: true,
          dry: false
        })
      ]
    });
}
//]]]
// [[[ Any development
if (ENV.indexOf('dev:') >= 0){
  config = merge(
    config,
    {
      module: {
        rules: [ rule_css_embed ]
      }
    }
  );
}
// ]]]
// [[[ Any produciton (jsugllify)
if (ENV.indexOf('build') >= 0  || ENV == 'start'){
  config = merge(
    config,
    {
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: 'source-map'
        }),
      ]
    }
  );
}
// ]]]
require('./webpack.log.js')(config);
module.exports = config;
