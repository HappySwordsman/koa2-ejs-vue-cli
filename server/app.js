const Koa = require("koa");
const app = new Koa();
// const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const proxy = require("./middleware/koa-proxy");
const cors = require("koa2-cors");
const koaStatic = require("koa-static");
// const koaMount = require("koa-mount");
// const config = require("../config/index");
const proxyOptions = require("../config/proxy.config");

// 当前项目环境
const isDev = process.env.NODE_ENV === "development";

const index = require("./routes/index");
const users = require("./routes/users");
const vueApp = require("./routes/vue-app");

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
if (isDev) {
  require("../build/webpack.dev.server")(app);
} else {
  // view engine setup
  /* app.use(
    views(__dirname + "/views", {
      extension: "ejs",
    })
  ); */
  // app.use(koaStatic(__dirname + "/static"));
  /*  app.use(
    koaMount(
      `/${config.build.assetsSubDirectory}`,
      koaStatic(__dirname + "/static")
    )
  ); */
}
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(vueApp.routes(), vueApp.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
