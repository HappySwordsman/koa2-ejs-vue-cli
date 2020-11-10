function vueApp(router) {
  router.prefix("/vue-app");

  router.get("/*", async (ctx) => {
    await ctx.render("front/index.ejs", {
      title: "hello koa vue!",
    });
  });
  return router;
}

module.exports = vueApp;
