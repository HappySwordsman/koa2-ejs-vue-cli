const ejs = require("ejs");

// 设置ejs 处理
ejs.delimiter = "?";

module.exports = {
  getTemplate: require("./tmp-process"),
  ejs,
};
