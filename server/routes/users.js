function users(router) {
  const User = require("../model/User");
  const { getNextSequenceValue, updateOne } = require("../utils/model-tools");
  const JwtUtil = require("../utils/Jwt");
  const { encryptCbc } = require("../utils/cryptoPackage");

  router.prefix("/api/users");

  /**
   * @apiDefine ErrorResponse
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        status: 0,
   *        msg: '参数错误',
   *        data: null
   *     }
   */

  /**
   * @api {post} /api/users/login login.
   * @apiSampleRequest /api/users/login
   * @apiName login
   * @apiDescription 用于登录和创建用户-登录
   * @apiVersion 1.0.0
   * @apiGroup Users
   *
   * @apiParam {Number} username 用户名称
   * @apiParam {Number} password 用户密码
   *
   * @apiSuccess {Object} data
   * @apiUse userInfo
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *
   * @apiUse ErrorResponse
   */
  router.post("/login", async function (ctx) {
    const resInfo = await accountLogin(ctx.request.body);
    ctx.body = {
      type: resInfo.type,
      data: resInfo.data,
    };
  });

  /**
   * @api {get} /api/users/info info.
   * @apiSampleRequest /api/users/info
   * @apiName info
   * @apiDescription 用于获取用户信息
   * @apiVersion 1.0.0
   * @apiGroup Users
   *
   * @apiHeader {String} accountToken
   *
   * @apiSuccess {Object} data
   * @apiUse userInfo
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *
   * @apiUse ErrorResponse
   */
  router.get("/info", async function (ctx) {
    const token = ctx.headers.accounttoken;
    const user = await getUserInfoByToken(token);
    if (user) {
      ctx.body = {
        type: "success",
        data: user,
      };
    } else {
      ctx.body = {
        type: "nonexistenceUser",
      };
    }
  });

  // 用户授权
  async function accountLogin({ username, password } = {}) {
    username = username && username.trim();
    password = password && password.trim();
    if (!username || !password) {
      return {
        type: "passwordError",
      };
    }
    const userInfo = await getUserInfoByName(username);

    // 查询用户是否存在
    // console.log(userInfo);
    if (userInfo) {
      // 用户存在 验证用过返回token
      const _password = encryptCbc(password);
      if (_password === userInfo.password) {
        // 通过用户的 _id(该标识具有唯一性) 生成 token
        // console.log(userInfo._id);
        const jwt = new JwtUtil(userInfo._id);
        const token = jwt.generateToken();
        await updateOne(
          User,
          { _id: userInfo._id },
          { $set: { accountToken: token, loginStatus: 1 } }
        );
        return {
          type: "success",
          data: {
            accountToken: token,
          },
        };
      } else {
        // 密码错误
        return {
          type: "passwordError",
          data: "账号/密码错误",
        };
      }
    } else {
      // 用户不存在直接创建用户 分配token
      const userInfo = await createUser(username, password);
      const jwt = new JwtUtil(userInfo._id);
      const token = jwt.generateToken();
      await updateOne(
        User,
        { _id: userInfo._id },
        { $set: { accountToken: token, loginStatus: 1 } }
      );
      return {
        type: "success",
        data: {
          accountToken: token,
        },
      };
    }
  }

  // 创建用户
  async function createUser(username, password) {
    const user = new User({
      id: await getNextSequenceValue(User, "UserId"),
      name: username,
      password: encryptCbc(password),
      createTime: new Date().getTime(),
    });
    return new Promise((resolve, reject) => {
      user.save((err, product) => {
        if (err) return reject(err);
        resolve(product);
      });
    }).catch((err) => {
      console.error(err);
    });
  }

  // 获取用户信息
  function getUserInfoByName(username) {
    return new Promise((resolve, reject) => {
      User.findOne(
        {
          name: username,
        },
        { __v: 0 }
      ).exec((err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }
  // 获取用户信息
  function getUserInfoByToken(token) {
    return new Promise((resolve, reject) => {
      User.findOne(
        {
          accountToken: token,
        },
        { password: 0, __v: 0, _id: 0, accountToken: 0 }
      ).exec((err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }

  return router;
}
module.exports = users;
