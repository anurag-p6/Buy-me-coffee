require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    fuji: {
      url: process.env.FUJI_RPC_URL || "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 43113,
    },
    avalanche: {
      url: process.env.AVALANCHE_RPC_URL || "https://api.avax.network/ext/bc/C/rpc",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 43114,
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC,
      accounts: [process.env.PRIVATE_KEY]
    },
    arbitrumSepolia: {
      url: process.env.ARBITRUM_SEPOLIA_RPC,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: {
      snowtrace: process.env.SNOWTRACE_API_KEY,
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY,
      avalanche: process.env.SNOWTRACE_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
      arbitrumSepolia: process.env.ETHERSCAN_API_KEY
    }
  },
  sourcify: {
    enabled: true
  }
};
