const del = require("del");
const clean = (cb) => {
  del(["dist/**/*", "!dist/favicon.ico"]);
  cb();
};
module.exports = clean;
