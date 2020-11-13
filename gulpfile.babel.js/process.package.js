// const path = require('path');
const fs = require("fs-extra");
const processPackage = (cb) => {
  // ${JSON.stringify(require("../package").scripts)},
  const jsonStr = `{
  "scripts": {
    "prd": "cross-env NODE_ENV=production node ./bin/www",
    "pm2:prd": "cross-env NODE_ENV=production pm2 start www"
  },
  "dependencies": ${JSON.stringify(
    require("../package").dependencies,
    undefined,
    "\t"
  )}
  }`;

  fs.outputFile("./dist/package.json", jsonStr, (err) => {
    if (err) {
      console.error(err);
    }
    cb();
  });
};
module.exports = processPackage;
