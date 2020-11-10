const presets = [
  [
    "@babel/preset-env",
    {
      useBuiltIns: "usage", // 垫片使用
      corejs: 3,
      // esmodules: true,
      // modules: "auto",
    },
  ],
  "@vue/babel-preset-jsx",
];
const plugins = ["@babel/plugin-transform-async-to-generator"];

module.exports = {
  presets,
  plugins,
  // Cannot assign to read only property 'exports' of object '#<Object>'
  // sourceType: 'unambiguous'
};
