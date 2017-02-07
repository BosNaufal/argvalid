
var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    singleRun: false,

    frameworks: ['mocha'],

    files: [
      'webpack/webpack-test.config.js'
    ],

    preprocessors: {
      'webpack/webpack-test.config.js': ['webpack']
    },

    reporters: ['mocha'],

    port: 9090,

    webpack: {

      module: {

        loaders: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
              presets: ["es2015"],
              plugins: ["transform-object-rest-spread"]
            }
          }
        ],


      },
    },

    webpackServer: {
      noInfo: true,
    },

  })
};
