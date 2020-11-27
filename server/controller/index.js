const Controller = require("./lib/Controller");
const Users = require("./users");

module.exports = {
  ...new Controller(),
  users: new Users(),
};
