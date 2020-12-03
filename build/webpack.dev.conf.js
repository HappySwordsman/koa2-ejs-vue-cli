"use strict";

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const utils = require("./utils");
const config = require("../config");
const webpackBaseConfig = require("./webpack.base.conf");

module.exports = merge(webpackBaseConfig, {
  module: {},

  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
    }),
    // OccurrenceOrderPlugin is needed for webpack 1.x only
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    // new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: http://${config.dev.host}:${config.dev.port}`,
          `or running here: http://127.0.0.1:${config.dev.port}`,
        ],
      },
      onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined,
    }),
  ],
  devtool: config.dev.devtool,

  mode: process.env.NODE_ENV,
});
