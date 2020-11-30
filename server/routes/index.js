const tokenVerifyMiddleware = require("../middleware/token-verify-middleware");
const koaResponse = require("../middleware/koa-response-middleware");
const Router = require("koa-router");
const controller = require("../controller");
const isApiTest = process.env.API_TEST === "testing";

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
    } else if (isApiTest) {
      continue;
    }

    routes[routeName](router, controller);
    app.use(router.routes(), router.allowedMethods());
  }
}
module.exports = registerRouter;
