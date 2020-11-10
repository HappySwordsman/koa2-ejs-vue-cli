/**
 * @apiDefine userInfo
 * @apiSuccess
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
