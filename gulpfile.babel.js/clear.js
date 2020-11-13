const clean = (cb) => {
  const del = require("del");
  del.sync(["dist/**"]);
  cb();
};
module.exports = clean;
