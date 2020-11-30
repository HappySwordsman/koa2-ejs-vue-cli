const Koa = require("koa");
const app = new Koa();
const views = require("./middleware/koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const proxy = require("./middleware/koa-http-proxy-middleware");
const cors = require("koa2-cors");
const koaStatic = require("koa-static");
// 连接数据库
const mongoDB = require("./model");

const routes = require("./routes");

// const koaMount = require("koa-mount");
const config = require("../config/index");
const proxyOptions = require("../config/proxy.config");

// 当前项目环境
const isDev = process.env.NODE_ENV === "development";
const isApiTest = process.env.API_TEST === "testing";

console.log(`apiMode: ${isApiTest}`);

// start mongoDB
try {
  mongoDB();
} catch (err) {
  console.log("mongoDB连接失败！！！");
  console.log(err);
}
// 计算接口时间
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 跨域中间件
app.use(cors());

// 代理中间件
app.use(proxy(proxyOptions));

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text", "xml"],
  })
);

app.use(json());

// logger
app.use(logger());

// 静态地址解析
app.use(koaStatic(`${__dirname}/public`));
// 开发模式 && 非接口模式
if (isDev && !isApiTest) {
  require("./utils/koa-dev-webpack")(app);
}
// 静态页中间件
app.use(views("views"));

// registerRouter
routes(app);

// 404 处理
app.use(async function (ctx, next) {
  /* 404 */
  await ctx.render("../../views/404.ejs", {
    title: "404",
    homePageUrl: `http://${config.dev.host}:${config.dev.port}`,
  });
  await next();
});

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
