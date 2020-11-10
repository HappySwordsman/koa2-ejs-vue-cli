function vueApp(router) {
  router.prefix("/vue-admin");

  router.get("/*", async (ctx) => {
    await ctx.render("admin/index.ejs", {
      title: "hello admin vue!",
    });
  });
  return router;
}

module.exports = vueApp;
