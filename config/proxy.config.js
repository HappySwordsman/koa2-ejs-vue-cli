const proxy = {
  targets: {
    "/file-api": {
      target: "https://snkoudai.oss-cn-hangzhou.aliyuncs.com",
      ws: false,
      secure: true, // https 需要配置
      changeOrigin: true,
      pathRewrite: {
        "^/file-api": "/common", // 需要的rewrite
      },
      onProxyRes(proxyRes, req, res) {
        console.log(proxyRes);
        console.log(req);
        console.log(res);
      },
    },
  },
};

module.exports = proxy;
