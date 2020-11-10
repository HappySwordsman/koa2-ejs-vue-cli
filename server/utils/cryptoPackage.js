const crypto = require("crypto"); // 加载crypto库

const ak = "xianrenmianjin^*";
const aiv = "xianrenmianjin-@";

/**
 * aes cbc 加密方法
 * @param str
 * @returns {string}
 */
const encryptCbc = (str) => {
  const cipher = crypto.createCipheriv("aes-128-cbc", ak, aiv);

  return Buffer.from(
    cipher.update(str, "binary") + cipher.final("binary"),
    "binary"
  ).toString("base64");
};

/**
 * cbc 解密方法
 * @param encryptStr
 * @returns {string}
 */
const decryptCbc = (encryptStr) => {
  const decipher = crypto.createDecipheriv("aes-128-cbc", ak, aiv);
  return (
    decipher.update(
      Buffer.from(encryptStr, "base64").toString("binary"),
      "binary",
      "utf8"
    ) + decipher.final("utf8")
  );
};

/**
 * sha1 加密
 * @param str
 * @returns {string}
 */
const encryptSha1 = (str) => {
  const hash = crypto.createHash("sha1");
  hash.update(str);
  return hash.digest("hex");
};

module.exports = {
  encryptCbc,
  decryptCbc,
  encryptSha1,
};
