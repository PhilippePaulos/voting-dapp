const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  deployer.deploy(Voting, "Guitarist", "Who is the best guitarist of all time ?");
};
