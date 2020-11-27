/**
 * 任务列表后台ui框架
 * 服务启动 webpack-dev-server
 * 项目打包 webpack-prod-build
 */

const { series } = require("gulp");
const clear = require("./clear");
const start = require("./start");
const build = require("./build");

exports.start = series(start);

exports.build = series(clear, build);
