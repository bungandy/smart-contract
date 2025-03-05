require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    // mainnet: {
    //   url: process.env.ETH_RPC_URL, // Your Alchemy or Infura RPC URL
    //   accounts: [process.env.PRIVATE_KEY], // Your wallet private key
    // },
    sepolia: {
      url: process.env.ETH_RPC_URL, // Your Alchemy or Infura RPC URL
      accounts: [process.env.PRIVATE_KEY], // Your wallet private key
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, // Optional for contract verification
  },
};
