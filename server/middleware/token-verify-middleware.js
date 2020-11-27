// 用于检验用户token的中间件
const { pathToRegexp } = require("path-to-regexp");
const JwtUtil = require("../utils/Jwt");

module.exports = function ({ whiteList = [] } = {}) {
  return async function (ctx, next) {
    // 在白名单中
    let onTheWhiteList = false;
    for (const whitePath of whiteList.values()) {
      if (
        pathToRegexp(whitePath, [], {
          start: true,
          end: false,
        }).test(ctx.path)
      ) {
        onTheWhiteList = true;
        break;
      }
    }

    if (!onTheWhiteList) {
      // 需要验证的接口
      const token = ctx.headers.accounttoken;
      // console.log(ctx.headers.accounttoken);
      const jwt = new JwtUtil();
      const { status } = jwt.verifyToken(token);
      // 如果考验通过就next，否则就返回登陆信息不正确
      if (status === 2) {
        ctx.body = {
          type: "noToken",
        };
      } else if (status === 0) {
        ctx.body = {
          type: "tokenFail",
        };
      } else {
        // 校验token 通过的接口
        await next();
      }
    } else {
      // 白名单接口
      await next();
    }
  };
};
