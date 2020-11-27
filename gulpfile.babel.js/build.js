module.exports = function (done) {
  const generateApidoc = require("./utils/generate.apidoc");
  const buildVue = require("./utils/build.vue");
  const buildServer = require("./utils/build.server");
  const processPack = require("./utils/process.package");
  const context = require("./utils//process.env")();

  process.env = {
    ...process.env,
    ...context,
  };

  generateApidoc();
  buildVue()
    .then(() => {
      return buildServer();
    })
    .then(() => {
      processPack();
      done();
    })
    .catch((e) => {
      console.log(e);
      done();
    });
};
