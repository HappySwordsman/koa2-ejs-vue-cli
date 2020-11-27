const Controller = require("./lib/Controller");
const User = require("../model/User");
const JwtUtil = require("../utils/Jwt");
const { updateOne } = require("../service/utils/model-tools");
const { encryptCbc } = require("../utils/cryptoPackage");
const ServeceUsers = require("../service/Users");
const serviceUsers = new ServeceUsers();

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

class UserController extends Controller {
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
  async login(ctx) {
    const resInfo = await accountLogin(ctx.request.body);
    ctx.body = {
      type: resInfo.type,
      data: resInfo.data,
    };
  }

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
  async info(ctx) {
    const token = ctx.headers.accounttoken;
    const user = await serviceUsers.getUserInfoByToken(token);
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
  }
}
module.exports = UserController;

// 用户授权 生成
async function accountLogin({ username, password } = {}) {
  username = username && String(username).trim();
  password = password && String(password).trim();
  if (!username || !password) {
    return {
      type: "passwordError",
    };
  }
  const jwt = new JwtUtil();
  const userInfo = await serviceUsers.getUserInfoByUsername(username);

  // 查询用户是否存在
  // console.log(userInfo);
  if (userInfo) {
    // 用户存在 验证用过返回token
    const _password = encryptCbc(password);
    if (_password === userInfo.password) {
      // 判断当前用户的token是否过期
      if (jwt.verifyToken(userInfo.accountToken).status === 1) {
        return {
          type: "success",
          data: {
            accountToken: userInfo.accountToken,
          },
        };
      }
      // 通过用户的 _id(该标识具有唯一性) 生成 token
      // console.log(userInfo._id);
      const token = jwt.generateToken(userInfo._id);
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
    const userInfo = await serviceUsers.createUser(
      username,
      encryptCbc(password)
    );
    const token = jwt.generateToken(userInfo._id);
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
