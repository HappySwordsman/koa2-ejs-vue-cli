// 服务端的工具
const $http = require("axios");
const ejs = require("ejs");
const config = require("../../config");
const isDev = process.env.NODE_ENV === "development";

// 设置ejs
ejs.delimiter = "?";
const getTemplate = (filename) => {
  return $http
    .get(
      `http://${config.dev.host}:${config.dev.port}${
        config[isDev ? "dev" : "build"].assetsPublicPath
      }views/${filename}`
    ) // 注意这个 'public' 公共资源前缀非常重要
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getTemplate,
  ejs,
};
