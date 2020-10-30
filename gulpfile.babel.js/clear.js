const del = require("del");
const clean = (cb) => {
  del.sync(["dist/**"]);
  cb();
};
module.exports = clean;
