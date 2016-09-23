const path = require('path');
const pluginMap = require('./modern.preset');
const webpack = require('webpack');
const babelPlugins = pluginMap.map(npmModule => (
  typeof npmModule === 'string' ? require.resolve(npmModule) : npmModule
));

const webpackPlugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(true),
];

const webpackConfig = {
  devtool: 'cheap-module-source-map',
  entry: {
    pokemon: [
      'babel-polyfill',
      './public/javascripts/bootstrap',
    ],
    vendor: [
      'lodash', 'react', 'redux', 'react-redux', 'react-dom',
      'bluebird', 'redux-thunk', 'redux-promise', 'redux-logger',
      'react-select', 'fixed-data-table', 'react-leaflet',
    ],
  },
  output: {
    path: path.join(__dirname, './public/dist'),
    filename: '[name].min.js',
  },
  module: {
    loaders: [
      {
        test: /\.css|\.less$/,
        loader: 'style-loader!css-loader!less-loader',
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)(\?.*$|$)/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
      },
      {
        test: /\.jsx$|\.js$|\.es6$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: babelPlugins,
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6', '.css'],
    root: [
      path.resolve(path.join(__dirname, './node_modules')),
      path.resolve(path.join(__dirname, './public')),
    ],
  },
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
    alias: {},
  },
  plugins: webpackPlugins,
};

module.exports = webpackConfig;
