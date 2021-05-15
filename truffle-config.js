require('babel-register');
require('babel-polyfill');

const { projectId, mnemonic } = require('./secrets.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/${projectId}`),
      network_id: 42,
      gas: 5000000,
      gasPrice: 20000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },

    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${projectId}`);
      },
      network_id: 3,
      gasPrice: 20000000000,
      gas: 5000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    main: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${projectId}`);
      },
      network_id: 1,
      gasPrice: 20000000000,
      gas: 5000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.8.4",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
