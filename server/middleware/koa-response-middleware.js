// 响应拦截器
const { pathToRegexp } = require("path-to-regexp");
const RespBody = require("../utils/responseHandler");
/**
 * 响应拦截器 中间件
 * @param {Object} options
 * @param {Array} options.ignore 忽略拦截的api
 */
module.exports = function (options = { ignore: ["/api/mock"] }) {
  return async function (ctx, next) {
    await next();
    let passed = false;
    for (let ignoreRouter of options.ignore.values()) {
      if (
        pathToRegexp(ignoreRouter, [], {
          start: true,
          end: false,
        }).test(ctx.path)
      ) {
        passed = true;
        break;
      }
    }
    if (!passed && typeof ctx.body !== "string") {
      try {
        const _body = ctx.body;
        ctx.body = new RespBody(_body.type, _body.data);
      } catch (e) {
        ctx.body = new RespBody("systemError");
      }
    }
  };
};
