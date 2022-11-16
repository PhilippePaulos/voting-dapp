const HDWalletProvider  = require('@truffle/hdwallet-provider');

require('dotenv').config();

const mnemonic = process.env.MNEMONIC;
const infuraProjectId = process.env.INFURA_PROJECT_ID;

console.log(mnemonic)
console.log(infuraProjectId)
module.exports = {

  contracts_build_directory: "../client/src/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    goerli: {
      provider: () => {
        return new HDWalletProvider(mnemonic, 'https://goerli.infura.io/v3/' + infuraProjectId)
      },
      network_id: '5'
    },
  },

  mocha: {
  },

  compilers: {
    solc: {
      version: "0.8.17",
    }
  },
};
