/* user 路由 */
function users(router) {
  router.prefix("/users");

  router.get("/", function (ctx) {
    ctx.body = "this is a users response!";
  });

  router.get("/bar", function (ctx) {
    ctx.body = "this is a users/bar response";
  });
  return router;
}

module.exports = users;
