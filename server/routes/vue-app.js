const router = require("koa-router")();

const { getTemplate, ejs } = require("../utils");

router.prefix("/vue-app");

router.get("/*", async (ctx) => {
  const template = await getTemplate("front/index.ejs"); // 获取 ejs 模板文件
  const html = ejs.render(template, { title: "hello koa vue " });
  ctx.type = "html";
  ctx.body = html;
});

module.exports = router;
