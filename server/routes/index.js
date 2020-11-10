const glob = require("glob");
const path = require("path");
const tokenVerifyMiddleware = require("../middleware/token-verify-middleware");
const Router = require("koa-router");

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
  const router = new Router();
  /* jwt 验证 一定要在路由返回前使用 */
  router.use(
    tokenVerifyMiddleware({
      whiteList: ["/api/mock", "/api/books", "/api/users/login", "/api/wechat"],
    })
  );
  routes[toStrSmallHump(keyName)] = require(file)(router);
});

function registerRouter(app) {
  for (let router of Object.values(routes)) {
    app.use(router.routes(), router.allowedMethods());
  }
}
module.exports = registerRouter;
