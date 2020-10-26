"use strict";

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const config = require("../config");
const webpackBaseConfig = require("./webpack.base.conf");

module.exports = merge(webpackBaseConfig, {
  module: {},
  plugins: [
    // 写入编译环境
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
    }),
    // css 压缩
    new OptimizeCss({
      cssProcessor: require("cssnano"),
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true },
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          minChunks: 1,
          chunks: "all",
          priority: 100,
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
    minimizer: [
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  devtool: config.build.devtool,
  mode: process.env.NODE_ENV,
});
