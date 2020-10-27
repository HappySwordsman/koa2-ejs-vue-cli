"use strict";
// This uses a lot of es 6, es 7 syntax, please use a higher version of nodejs to compile
// The entire entry of the project is in the src directory, please do not modify
// 这里使用了很多的es6、es7的语法，请使用高版本的nodejs编译
// 项目的整个入口在src目录下，请勿修改

// node_modules
const path = require("path");
const webpack = require("webpack");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

// config variable(全局变量)
const config = require("../config");
const utils = require("./utils");
const isDev = process.env.NODE_ENV === "development";
// 处理路径的正则 \\双反向斜杠浏览器会返回这样的路径
const pathREG = /[/|//|\\|\\\\]/g;

const resolve = (dir) => {
  return path.join(__dirname, "..", dir);
};

// webpack base setting
module.exports = {
  name: "koa2-vue-cli",
  // 入口通过自调用函数会读取/src/js路径下的所有js文件
  entry: {
    ...((filePathList) => {
      const entry = {};
      filePathList.forEach((_path) => {
        const fileName = path.parse(_path).name;
        entry[fileName] = isDev
          ? ["webpack-hot-middleware/client?reload=true", _path]
          : _path;
      });
      return entry;
    })(glob.sync(resolve(`${config.entry}/entry/*.js`))),
  },
  // 用于cdn的全局变量
  // externals: {
  //   $: 'jQuery'
  // },
  // 输出js
  output: {
    path: config.build.assetsRoot, // 默认 dist
    publicPath: config[isDev ? "dev" : "build"].assetsPublicPath, // 默认 /
    filename: path.posix.join(
      config[isDev ? "dev" : "build"].assetsSubDirectory,
      "js/[name].[hash:5].js"
    ),
    chunkFilename: path.posix.join(
      config[isDev ? "dev" : "build"].assetsSubDirectory,
      "js/[id].[chunkhash].js"
    ),
  },
  // 路径超级变量
  resolve: {
    // require时不添加后缀名从该数组中查找后缀名匹配
    extensions: [".js", ".json", ".vue"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve(config.entry),
    },
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                whitespace: "condense",
              },
              transformAssetUrls: {
                video: ["src", "poster"],
                source: "src",
                img: "src",
                image: ["xlink:href", "href"],
                use: ["xlink:href", "href"],
              },
            },
          },
        ],
      },
      {
        // js
        test: /\.js$/,
        exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: ["babel-loader"],
      },
      {
        // img
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: config[isDev ? "dev" : "build"].assetsSubDirectory,
              name: "img/[name].[ext]?[contenthash]",
              esModule: false,
            },
          },
        ],
      },
      {
        // font
        test: /\.(eot|woff2|woff|ttf|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: config[isDev ? "dev" : "build"].assetsSubDirectory,
              name: "font/[name].[ext]?[contenthash]",
            },
          },
        ],
      },
      {
        // ejs
        test: /\.ejs$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
          {
            loader: "ejs-html-loader",
            options: {
              delimiter: "?",
              production: !isDev,
            },
          },
        ],
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          isDev
            ? {
                loader: "vue-style-loader",
                options: {
                  sourceMap: true,
                },
              }
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  // "export 'default' (imported as 'mod') was not found
                  esModule: false,
                },
              },
          {
            loader: "css-loader",
            options: {
              // esModule：false 开发环境样式才会生效
              esModule: false,
              sourceMap: true,
              importLoaders: 1,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    // 定义全局变量，定义后不再需要import或require
    new webpack.ProvidePlugin({}),

    // html 输出
    ...glob.sync(resolve(`${config.serverEntry}/views/*.ejs`)).map((_path) => {
      const splitPath = _path.split(pathREG);
      // ejs ---> html文件 输出路径
      const fileName = `${splitPath.slice(-2)[0]}/${path.parse(_path).name}`;
      const chunkName = path.parse(_path).name;

      const chunks = isDev ? [chunkName] : ["manifest", "vendors", chunkName];
      return new HtmlWebpackPlugin({
        template: _path,
        filename: `${fileName}.ejs`, // resolve(),
        hash: true, // 为了更好的 cache，可以在文件名后加个 hash。
        cache: false,
        meta: {
          viewport:
            "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no",
        },
        // publicPath: "/server/static",
        favicon: resolve(`${config.entry}/assets/favicon.png`),
        chunks,
      });
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve("static"),
          to: config[isDev ? "dev" : "build"].assetsSubDirectory,
          globOptions: {
            ignore: [".*"],
          },
        },
      ],
    }),
    new VueLoaderPlugin(),
    // 抽出css
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: utils.assetsPath("css/[name].css"), // devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: utils.assetsPath("css/[id].css"), // devMode ? '[id].css' : '[id].[hash].css'
    }),
    new StyleLintPlugin({
      files: ["**/*.{vue,htm,html,css,sss,less,scss,sass}"],
    }),
  ],
};
