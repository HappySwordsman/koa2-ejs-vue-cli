/**
 * @apiDefine userInfo
 * @apiSuccess {Number} id
 * @apiSuccess {String} name 用户名
 * @apiSuccess {String} password 密码
 * @apiSuccess {Number} createTime
 * @apiSuccess {String} email 邮箱
 * @apiSuccess {String} headPic 头像
 * @apiSuccess {String} nickName 昵称
 * @apiSuccess {String} personalPrefile 个人简介
 * @apiSuccess {Number} loginStatus 登录状态 0-未登录 1-登录
 * @apiSuccess {String} accountToken token
 * db.users.insert({"sequenceName" : "UserId", "sequenceValue" : -1})
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    sequenceName: String,
    sequenceValue: Number,
    id: { type: Number, default: 0 },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createTime: {
      type: Number,
      default: new Date().getTime(),
    },
    email: {
      type: String,
      default: null,
    },
    headPic: {
      type: String,
      default:
        "https://img2.woyaogexing.com/2020/05/11/a3db755ca5bf4cc7a8857cf563450871!400x400.jpeg",
    },
    nickName: {
      type: String,
      default: null,
    },
    // 个人简介
    personalPrefile: {
      type: String,
      default: null,
    },
    loginStatus: {
      type: Number,
      default: 0,
    },
    accountToken: {
      type: String,
      default: null,
    },
  },
  { id: false }
);

module.exports = mongoose.model("User", userSchema);
