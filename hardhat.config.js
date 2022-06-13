require("@nomiclabs/hardhat-waffle")
require("hardhat-deploy")
require('dotenv').config
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
// https://eth-goerli.alchemyapi.io/v2/7B-ztZA4BbIryR9g3Ou0xagt-o9OVh-d

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.7",
  networks:{
    goerli: {
      url: 'https://eth-goerli.alchemyapi.io/v2/7B-ztZA4BbIryR9g3Ou0xagt-o9OVh-d',
      accounts: ['d5e9ecd6a84853c487dc3c21c9009bf9cc0a4e529f2364cc217287387bb0d571']
    }
  },
  namedAccounts: {
    deployer:{
      default: 0, // ethers built in accounts at index 0
    },
  },
};
