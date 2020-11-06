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
// const koaMount = require("koa-mount");
// const config = require("../config/index");
const proxyOptions = require("../config/proxy.config");

// 当前项目环境
const isDev = process.env.NODE_ENV === "development";
const isApiTest = process.env.API_TEST === "testing";

console.log(`api: ${process.env.API_TEST}`);

const routes = require("./routes");

app.use(cors());

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
app.use(logger());

app.use(koaStatic(__dirname + "/public"));
if (isDev && !isApiTest) {
  require("./utils/koa-dev-webpack")(app);
}
app.use(views("views"));
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// registerRouter
routes(app);

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
