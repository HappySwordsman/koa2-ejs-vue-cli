// 服务端的工具
const $axios = require("axios");
const path = require("path");
const ejs = require("ejs");
const config = require("../../config");
const isDev = process.env.NODE_ENV === "development";

// 设置ejs 处理
ejs.delimiter = "?";
function viewsMiddleware(_path, options = {}) {
  return async function views(ctx, next) {
    let extendsContext = false;

    function render(relPath, locals = {}) {
      if (extendsContext) {
        if (this.ctx && this.ctx.req === this.req) ctx = this.ctx;
        else ctx = this;
      }
      return $axios
        .get(
          [
            `http://${config.dev.host}:${config.dev.port}`,
            path.join(
              config[isDev ? "dev" : "build"].assetsPublicPath,
              _path,
              relPath
            ),
          ].join("")
        )
        .then((res) => {
          return res.data;
        })
        .then((template) => {
          const state = Object.assign(locals, options, ctx.state || {});
          ctx.type = "text/html";
          ctx.body = ejs.render(template, state);
        })
        .catch((err) => {
          throw err;
        });
    }

    // Use to extends app.context
    if (!ctx) {
      extendsContext = true;
      return render;
    }

    if (ctx.render) await next();

    ctx.response.render = ctx.render = render;

    await next();
  };
}
module.exports = viewsMiddleware;
