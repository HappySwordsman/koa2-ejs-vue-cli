const buildServer = () => {
  const ora = require("ora");
  const chalk = require("chalk");
  const webpack = require("webpack");
  const webpackConfig = require("../../build/webpack.build.server");

  const spinner = ora({
    text: chalk.blue("building for server..."),
    spinner: "dots",
  });

  console.log("===================");
  console.log(process.env.API_TEST);
  console.log("===================");
  spinner.start();
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      spinner.stop();
      if (err) {
        reject(err);
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
        process.exit(1);
      }

      console.log(chalk.cyan("  Build complete.\n"));
      resolve();
    });
  });
};

module.exports = buildServer;
