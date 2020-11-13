// const path = require('path');
const generateApidoc = () => {
  const fs = require("fs-extra");
  // node 进程执行程序
  const { exec } = require("child_process");
  const apidoc = require("../../apidoc.json");
  const packageConf = require("../../package.json");
  const config = require("../../config");

  // 执行shell命令
  apidoc.url = `http://127.0.0.1:${config.dev.port}`; // 可换成自己的域名
  apidoc.sampleUrl = `http://127.0.0.1:${config.dev.port}`;
  apidoc.version = packageConf.version;
  // 写入打包进入正式服务器
  fs.outputFileSync("./apidoc.json", JSON.stringify(apidoc), undefined, "\t");

  exec(
    "apidoc -i ./server/routes -i ./server/model -o ./server/public/apidoc",
    (error) => {
      apidoc.url = `http://127.0.0.1:${config.dev.port}`;
      apidoc.sampleUrl = `http://127.0.0.1:${config.dev.port}`;
      fs.outputFileSync(
        "./apidoc.json",
        JSON.stringify(apidoc, undefined, "\t")
      );
      if (error) {
        console.error(`执行的错误: ${error}`);
      }
    }
  );
};
module.exports = generateApidoc;
