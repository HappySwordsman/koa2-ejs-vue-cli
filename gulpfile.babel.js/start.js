module.exports = function (done) {
  const path = require("path");
  const nodemon = require("gulp-nodemon");
  const env = require("./utils//process.env")();
  const resolve = (dirname) => path.join(__dirname, "..", dirname);
  nodemon({
    script: resolve("./server/bin/www"), // run ES5 code
    watch: resolve("./server"), // watch ES2015 code
    env,
    done,
  });
};
