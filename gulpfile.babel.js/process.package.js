// const path = require('path');
const fs = require('fs-extra');
const processPackage = (cb) => {
  // ${JSON.stringify(require("../package").scripts)},
  const jsonStr = `{
  "scripts": {
    "node:buildStart": "cross-env NODE_ENV=production node ./server/www.js",
    "pm2:buildStart": "cross-env NODE_ENV=production pm2 start ./server/www.js"
  },
  "dependencies": ${JSON.stringify(require('../package').dependencies)}
  }`;

  fs.outputFile('./dist/package.json', jsonStr, (err) => {
    // console.log(err);
    cb();
  });
};
module.exports = processPackage;
