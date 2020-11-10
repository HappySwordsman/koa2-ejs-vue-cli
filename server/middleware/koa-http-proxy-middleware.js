const { createProxyMiddleware } = require("http-proxy-middleware");
const k2c = require("koa2-connect");
const { pathToRegexp } = require("path-to-regexp");

module.exports = ({ targets = {} } = {}) => {
  return async function (ctx, next) {
    const { path } = ctx;
    for (const route of Object.keys(targets)) {
      if (
        pathToRegexp(route, [], {
          start: true,
          end: false,
        }).test(path)
      ) {
        await k2c(createProxyMiddleware(targets[route]))(ctx, next);
        break;
      }
    }
    await next();
  };
};
