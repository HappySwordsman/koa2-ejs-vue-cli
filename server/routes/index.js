const glob = require("glob");
const path = require("path");
const router = require("koa-router");

const routes = {
  /*  users: require("./users")(router()),
  vueApp: require("./vue-app")(router()),
  vueAdmin: require("./vue-admin")(router()), */
};

// 小驼峰
function toStrSmallHump(str) {
  return str.replace(/-(\w)/g, function ($, $1) {
    return $1.toUpperCase();
  });
}

glob.sync(`${__dirname}/**/!(index).js`).forEach((file) => {
  const relativePath = file.replace(`${__dirname}/`, "");
  const relativePathParse = path.parse(relativePath);
  const keyName = relativePath
    .replace(relativePathParse.ext, "")
    .replace(".", "-");
  // console.log(toStrSmallHump(keyName));
  routes[toStrSmallHump(keyName)] = require(file)(router());
});

function registerRouter(app) {
  for (let route of Object.values(routes)) {
    app.use(route.routes(), route.allowedMethods());
  }
}
module.exports = registerRouter;
