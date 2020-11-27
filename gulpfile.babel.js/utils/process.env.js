module.exports = function () {
  const path = require("path");
  const glob = require("glob");
  const fs = require("fs-extra");
  const pack = require("../../package.json");
  const cli = require("./cli")
    .program({ name: pack.name.replace(/@.+\//, ""), version: pack.version })
    .option(["-m", "--mode"], { metavar: "mode", help: "set process.env" })
    .parse(process.argv);
  const resolve = (dirname) => path.join(__dirname, "../..", dirname);

  const envs = glob.sync(`${resolve("./")}/.env.*`).reduce((_envs, env) => {
    _envs[path.parse(env).ext.replace(/^\./, "")] = fs.readFileSync(env, {
      encoding: "utf-8",
    });
    return _envs;
  }, {});
  const mode = envs[cli.mode || "development"];
  if (!mode)
    return {
      NODE_ENV: "development",
    };
  const envParams = (
    mode.match(/[a-zA-Z_-]+[\s]?=[\s]?['"][a-zA-Z0-9-_/\\]*['"](?=\s)/g) || [
      'NODE_ENV="development"',
    ]
  ).map((param) => param.replace(/[\s'"]/g, ""));

  return envParams.reduce((env, param) => {
    env[param.split("=")[0]] = param.split("=")[1];
    return env;
  }, {});
};
