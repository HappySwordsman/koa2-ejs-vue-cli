module.exports = function (router, controller) {
  // 登录并创建用户信息
  router.post("/users/login", controller.users.login);
  // 查询用户信息
  router.get("/users/info", controller.users.info);
};
