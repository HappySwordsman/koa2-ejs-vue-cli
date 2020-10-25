const router = require("koa-router")();

const { getTemplate, ejs } = require("../utils");

router.get("/", async (ctx) => {
  const template = await getTemplate("index.ejs"); // 获取 ejs 模板文件
  const html = ejs.render(template, { title: "heihei" });
  ctx.body = html;
  /* await ctx.render("index", {
    title: "Hello Koa 2!",
  }); */
});
/* 
router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
}); */

module.exports = router;
