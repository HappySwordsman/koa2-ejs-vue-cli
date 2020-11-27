// 用于登录 token验证
// 引入模块依赖
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
// const { decryptCbc, encryptCbc } = require('./cryptoPackage');
const resolve = (dir) => path.join(__dirname, "../", dir);

// 创建 token 类
class Jwt {
  constructor() {
    // 密文信息 / token
    // this.data = data;
  }

  /**
   * 生成token
   * @param {String} key 生成token的主键
   */
  generateToken(key) {
    const created = Math.floor(Date.now() / 1000);
    const cert = fs.readFileSync(resolve("pem/rsa_private_key.pem")); // 私钥 可以自己生成
    // token
    return jwt.sign(
      {
        data: key,
        exp: created + 60 * 60,
      },
      cert,
      { algorithm: "RS256" }
    );
  }

  /**
   * 校验token
   * @param {String} token
   */
  verifyToken(token) {
    const statusInfo = {
      status: 1, // 0-失败 1-成功 2-不存在
      msg: "token success",
    };
    const cert = fs.readFileSync(resolve("pem/rsa_public_key.pem")); // 公钥 可以自己生成
    try {
      const result = jwt.verify(token, cert, { algorithms: ["RS256"] }) || {};
      const { exp = 0 } = result;
      const current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        statusInfo.status = 1;
        statusInfo.msg = "token success";
      }
    } catch (e) {
      if (e.message.indexOf("jwt expired") !== -1) {
        // token 过期
        statusInfo.status = 0;
        statusInfo.msg = "token exp";
      } else {
        // 没带 token or err
        statusInfo.status = 2;
        statusInfo.msg = "token absence";
      }
    }
    return statusInfo;
  }
}

module.exports = Jwt;
