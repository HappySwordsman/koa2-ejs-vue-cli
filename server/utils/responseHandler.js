// 响应状态
const SUCCESS = "success"; // 成功
const PARAMS_ERROR = "paramsError"; // 参数错误
const TOKEN_FAIL = "tokenFail"; // 登录已过期,请重新登录
const NO_TOKEN = "noToken"; // 没有token
const PASSWORD_ERROR = "passwordError"; // 密码错误
const WECHAT_ERROR = "wechatError"; // 微信错误 失败
const SYSTEM_ERROR = "systemError"; // 系统错误
const NONEXISTENCE_API = "nonexistenceApi"; // 接口不存在
const NONEXISTENCE_USER = "nonexistenceUser"; // 用户不存在

class RespBody {
  constructor(bodyType, data = null) {
    this.data = data;
    return this[bodyType];
  }
  get [SUCCESS]() {
    return {
      data: this.data,
      code: 200,
      msg: "success",
      status: 1,
    };
  }
  get [PARAMS_ERROR]() {
    return {
      data: this.data,
      code: 412,
      msg: "参数错误",
      status: 0,
    };
  }
  get [TOKEN_FAIL]() {
    return {
      data: this.data,
      code: 403,
      msg: "登录已过期,请重新登录",
      status: 0,
    };
  }
  get [NO_TOKEN]() {
    return {
      data: this.data,
      code: 402,
      msg: "token 不存在",
      status: 0,
    };
  }
  get [PASSWORD_ERROR]() {
    return {
      data: this.data,
      code: 405,
      msg: "账号/密码错误",
      status: 0,
    };
  }
  get [WECHAT_ERROR]() {
    return {
      data: this.data,
      code: 406,
      msg: "微信错误",
      status: 0,
    };
  }
  get [SYSTEM_ERROR]() {
    return {
      data: this.data,
      code: 500,
      msg: "未知错误",
      status: 0,
    };
  }
  get [NONEXISTENCE_API]() {
    return {
      data: this.data,
      code: 404,
      msg: "接口不存在",
      status: 0,
    };
  }
  get [NONEXISTENCE_USER]() {
    return {
      data: this.data,
      code: 5001,
      msg: "用户不存在",
      status: 0,
    };
  }
}

module.exports = RespBody;
