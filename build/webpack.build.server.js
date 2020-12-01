"use strict";

const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const config = require("../config/index");

const resolve = (dir) => {
  return path.join(__dirname, "..", dir);
};

module.exports = {
  name: "build server",
  target: "node",
  entry: resolve(`${config.serverEntry}/app.js`),
  output: {
    path: resolve("dist"),
    filename: "app.js",
    libraryTarget: "commonjs2",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: false, // true 会将打包前的的路径记住并改成相对路径
    setImmediate: true,
    path: true,
  },
  resolve: {
    extensions: [".js"],
  },
  externals: nodeExternals({
    allowlist: /\.css$/,
  }),
  // devtool: "sourcemap",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        enforce: "pre",
        include: [resolve(config.serverEntry)],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      node: true,
                    },
                  },
                ],
              ],
            },
          },
        ],
      },

      {
        // img
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "static/img/[name].[ext]?[contenthash]",
              esModule: false,
            },
          },
          {
            // 图片压缩工具
            loader: "img-loader",
            options: {
              plugins: [
                require("imagemin-gifsicle")({
                  interlaced: false,
                }),
                /* require('imagemin-mozjpeg')({
                                  progressive: true,
                                  arithmetic: false
                                }), */
                require("imagemin-pngquant")({
                  floyd: 0.5,
                  speed: 2,
                }),
                require("imagemin-svgo")({
                  plugins: [{ removeTitle: true }, { convertPathData: false }],
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      WEBPACK_BUNDLE: true,
      "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    // cp server/public
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve("server/public"),
          to: "public",
          globOptions: {
            ignore: [".*"],
          },
        },
      ],
    }),
    // cp server/bin
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve("server/bin"),
          to: "bin",
          globOptions: {
            ignore: [".*"],
          },
        },
      ],
    }),
    // cp server/pem
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve("server/pem"),
          to: "pem",
          globOptions: {
            ignore: [".*"],
          },
        },
      ],
    }),
  ],
  mode: process.env.NODE_ENV,
};
