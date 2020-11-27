const User = require("../model/User");
const {
  getNextSequenceValue,
  findOne,
  createModelOne,
} = require("./utils/model-tools");

class Users {
  /**
   * 创建用户(用户名唯一不能重复)
   * @param {String} username 用户名
   * @param {String} password 加密后的密码
   */
  async createUser(username, password) {
    return await createModelOne(User, {
      id: await getNextSequenceValue(User, "UserId"),
      name: username,
      password: password,
      createTime: new Date().getTime(),
    });
  }
  /**
   * 通过用户名查询用户信息
   * @param {String} username 用户名
   */
  async getUserInfoByUsername(username) {
    return await findOne(
      User,
      {
        name: username,
      },
      { __v: 0 }
    );
  }
  /**
   * 通过token获取用户名
   * @param {String} token 用户的唯一认证字段
   */
  async getUserInfoByToken(token) {
    return await findOne(
      User,
      {
        accountToken: token,
      },
      { password: 0, __v: 0, _id: 0, accountToken: 0 }
    );
  }
}

module.exports = Users;
