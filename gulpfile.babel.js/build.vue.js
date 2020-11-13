// 懒到无敌，直接从vue-cli2中抄过来的，我没有走gulp的管道，不喜欢的，自己改一下
// nodejs [DEP0097] 这个报错，是因为api废弃了，依赖问题直接使用node build 就不会报错了

const ora = require("ora");
const rm = require("rimraf");
const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");
const config = require("../config");
const webpackConfig = require("../build/webpack.build.conf");

const build = (cb) => {
  const spinner = ora({
    text: chalk.blue("building for production..."),
    spinner: "dots",
  });

  spinner.start();
  rm(
    path.join(config.build.assetsRoot, config.build.assetsSubDirectory),
    (err) => {
      if (err) {
        cb();
        throw err;
      }
      webpack(webpackConfig, (err, stats) => {
        spinner.stop();
        if (err) {
          cb();
          throw err;
        }
        process.stdout.write(
          stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false,
          }) + "\n\n"
        );

        if (stats.hasErrors()) {
          console.log(chalk.red("  Build failed with errors.\n"));
          cb();
          process.exit(1);
        }

        console.log(chalk.cyan("  Build complete.\n"));
        console.log(
          chalk.yellow(
            "  Tip: built files are meant to be served over an HTTP server.\n" +
              "  Opening index.html over file:// won't work.\n"
          )
        );
        cb();
      });
    }
  );
};
module.exports = build;
