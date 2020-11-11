module.exports = function (done) {
  const path = require("path");
  const nodemon = require("gulp-nodemon");
  const env = require("./process.env")();
  const resolve = (dirname) => path.join(__dirname, "..", dirname);
  console.log(env);
  nodemon({
    script: resolve("./server/bin/www"), // run ES5 code
    watch: resolve("./server"), // watch ES2015 code
    env,
    done,
  });
  /* exec(
    `${script} ./node_modules/.bin/nodemon server/bin/www`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`执行的错误: ${error}`);
        return cb();
      }
      console.log(process.env.API_TEST);
      console.log(`stdout - ${stdout}`);
      console.error(`stderr - ${stderr}`);
      cb();
    }
  ); */
};
