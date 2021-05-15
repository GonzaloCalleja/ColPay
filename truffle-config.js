require('babel-register');
require('babel-polyfill');

const { projectId, mnemonic, deployer } = require('./secrets.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    // Local Ganache Blockchain used for testing deployment
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      from: deployer // ensuring the deployer is the same account for all networks
    },

    // Test Networks to make smart contract publicly available
    // They work just like the main net, but the Ether is worthless
    // In order for deployment to work first request funds from a faucet!
    kovan: {
      provider: () => new HDWalletProvider({
        mnemonic: mnemonic, 
        providerOrUrl: `https://kovan.infura.io/v3/${projectId}`, 
        addressIndex: 0
      }),
      network_id: 42,
      gas: 5000000,
      gasPrice: 20000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },

    ropsten: {
      provider: () => new HDWalletProvider({
        mnemonic: mnemonic, 
        providerOrUrl: `https://ropsten.infura.io/v3/${projectId}`, 
        addressIndex: 0
      }),
      network_id: 3,
      gasPrice: 20000000000,
      gas: 5000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      from: deployer
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
