// 用于登录 token验证
// 引入模块依赖
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
// const { decryptCbc, encryptCbc } = require('./cryptoPackage');
const resolve = (dir) => path.join(__dirname, "../", dir);

// 创建 token 类
class Jwt {
  constructor(data) {
    // 密文信息 / token
    this.data = data;
  }

  // 生成token
  generateToken() {
    const data = this.data;
    const created = Math.floor(Date.now() / 1000);
    const cert = fs.readFileSync(resolve("pem/rsa_private_key.pem")); // 私钥 可以自己生成
    // token
    return jwt.sign(
      {
        data,
        exp: created + 60 * 30,
      },
      cert,
      { algorithm: "RS256" }
    );
  }

  // 校验token
  verifyToken() {
    const token = this.data;
    const cert = fs.readFileSync(resolve("pem/rsa_public_key.pem")); // 公钥 可以自己生成
    let res;
    try {
      const result = jwt.verify(token, cert, { algorithms: ["RS256"] }) || {};
      const { exp = 0 } = result;
      const current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.data || {};
      } else {
        // 失效的token
        res = "fail";
      }
    } catch (e) {
      // 没带 token
      res = null;
    }
    return res;
  }
}

module.exports = Jwt;
