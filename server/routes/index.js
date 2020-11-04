const router = require("koa-router");

const routes = {
  users: require("./users")(router()),
  vueApp: require("./vue-app")(router()),
};

function registerRouter(app) {
  for (let route of Object.values(routes)) {
    app.use(route.routes(), route.allowedMethods());
  }
}
module.exports = registerRouter;
