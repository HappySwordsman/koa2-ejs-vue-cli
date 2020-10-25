const router = require("koa-router")();

const { getTemplate, ejs } = require("../utils");

router.prefix("/vue-app");

router.get("/*", async (ctx) => {
  const template = await getTemplate("index.ejs"); // 获取 ejs 模板文件
  const html = ejs.render(template, { title: "heihei" });
  ctx.type = "html";
  ctx.body = html;
});

module.exports = router;
