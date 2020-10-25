const presets = [
  [
    "@babel/preset-env",
    {
      useBuiltIns: "usage", // 垫片使用
      corejs: 2,
    },
  ],
];
const plugins = ["@babel/plugin-transform-async-to-generator"];

module.exports = {
  presets,
  plugins,
  // Cannot assign to read only property 'exports' of object '#<Object>'
  // sourceType: 'unambiguous'
};
