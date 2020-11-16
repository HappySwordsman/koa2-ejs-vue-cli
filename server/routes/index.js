const tokenVerifyMiddleware = require("../middleware/token-verify-middleware");
const koaResponse = require("../middleware/koa-response-middleware");
const Router = require("koa-router");
const controller = require("../controller");

const routes = {
  // views
  vueApp: require("./views/vue-app"),
  vueAdmin: require("./views/vue-admin"),

  // mock
  mockUsers: require("./mock/users"),
  mockTransaction: require("./mock/transaction"),

  // api
  users: require("./users"),
};

// 小驼峰
// function toStrSmallHump(str) {
//   return str.replace(/-(\w)/g, function ($, $1) {
//     return $1.toUpperCase();
//   });
// }
// webpack 无法动态获取require文件，导致路由依赖没有引入，故废弃这种引入方式
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
  for (let routeName of Object.keys(routes)) {
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

    if (routeName.indexOf("vue") === -1) {
      router.prefix("/api");
    }

    routes[routeName](router, controller);
    app.use(router.routes(), router.allowedMethods());
  }
}
module.exports = registerRouter;
