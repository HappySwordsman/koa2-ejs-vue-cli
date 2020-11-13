const tokenVerifyMiddleware = require("../middleware/token-verify-middleware");
const koaResponse = require("../middleware/koa-response-middleware");
const Router = require("koa-router");

const routes = {
  users: require("./users"),
  vueApp: require("./views/vue-app"),
  vueAdmin: require("./views/vue-admin"),
  mockUsers: require("./mock/users"),
  mockTransaction: require("./mock/transaction"),
};

// 小驼峰
// function toStrSmallHump(str) {
//   return str.replace(/-(\w)/g, function ($, $1) {
//     return $1.toUpperCase();
//   });
// }

// glob.sync(`${__dirname}/**/!(index).js`).forEach((file) => {
//   const relativePath = file.replace(`${__dirname}/`, "");
//   const relativePathParse = path.parse(relativePath);
//   const keyName = relativePath
//     .replace(relativePathParse.ext, "")
//     .replace(".", "-");
//   const router = new Router();
//   /* jwt 验证 一定要在路由返回前使用 */
//   router.use(
//     tokenVerifyMiddleware({
//       whiteList: [
//         "/vue-admin",
//         "/vue-app",
//         "/api/mock",
//         "/api/books",
//         "/api/users/login",
//         "/api/wechat",
//       ],
//     })
//   );
//   routes[toStrSmallHump(keyName)] = require(file)(router);
// });

function registerRouter(app) {
  // 响应拦截器
  app.use(
    koaResponse({
      ignore: ["/api/mock", "/vue-admin", "/vue-app"],
    })
  );
  for (let routeFn of Object.values(routes)) {
    const router = new Router();
    /* jwt 验证 一定要在路由返回前使用 */
    router.use(
      tokenVerifyMiddleware({
        whiteList: [
          "/vue-admin",
          "/vue-app",
          "/api/mock",
          "/api/books",
          "/api/users/login",
          "/api/wechat",
        ],
      })
    );
    const route = routeFn(router);
    app.use(route.routes(), route.allowedMethods());
  }
}
module.exports = registerRouter;
