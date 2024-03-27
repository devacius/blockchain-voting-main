// const Election = artifacts.require("Election");

// module.exports = function (deployer) {
//   deployer.deploy(Election);
// };

const TempContract = artifacts.require("TempContract");
module.exports = function (deployer) {
  deployer.deploy(TempContract);
};
