"use strict";
// webpack的全局配置项

const path = require("path");
// const proxyConfig = require("./proxy.config");

const resolve = (dir) => {
  return path.join(__dirname, "..", dir);
};

module.exports = {
  // 文件后缀名
  ext: "ejs",
  // 入口
  entry: "client",
  serverEntry: "server",
  // 服务配置项
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/public/",
    // assetsSuFilebDirectory: "static",
    // 代理配置项
    // proxyTable: proxyConfig.proxy,
    host: "0.0.0.0",
    port: 9001,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */
    devtool: "cheap-module-eval-source-map",

    cacheBusting: true,
    cssSourceMap: true,
  },
  // 打包配置项
  build: {
    index: resolve("dist/index.html"),
    // 输出目录
    assetsRoot: resolve("dist/public"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    // assetsSuFilebDirectory: "../../static",
    productionSourceMap: false,
    devtool: "source-map",

    // 设置为true之前，请确保：
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    bundleAnalyzerReport: process.env.npm_config_report,
  },
};
