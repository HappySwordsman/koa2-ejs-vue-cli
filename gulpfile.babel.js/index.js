/**
 * 任务列表后台ui框架
 * 服务启动 webpack-dev-server
 * 项目打包 webpack-prod-build
 */

const { series } = require('gulp');

const processPack = require('./process.package');

exports.build = series(processPack);

