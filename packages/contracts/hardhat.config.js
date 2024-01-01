require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("ethereum-waffle");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy-ethers");
require("@nomiclabs/hardhat-solhint");
require("@nomiclabs/hardhat-web3");
require("dotenv/config");
require("hardhat-deploy");
require("hardhat-preprocessor");
require("@openzeppelin/hardhat-upgrades");
require("hardhat-gas-reporter");

const fs = require("fs");

const {
  metamaskKey,
  bscTestnet,
  ethTestnet,
  zkTestnet,
  INFURA_KEY,
} = require("./secrets");

function getRemappings() {
  return fs
    .readFileSync("remappings.txt", "utf8")
    .split("\n")
    .filter(Boolean) // remove empty lines
    .map((line) => line.trim().split("="));
}

module.exports = {
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      chainId: 1337,
      mining: {
        auto: false,
      },
      allowUnlimitedContractSize: true,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
      chainId: 5,
      accounts: metamaskKey,
      gas: 3000000,
      gasPrice: 3000000000,
    },
    ethereum: {
      url: `https://rpc.mevblocker.io`,
      chainId: 1,
      accounts: metamaskKey,
    },
    bscscan: {
      url: `https://bsc-dataseed.binance.org`,
      chainId: 56,
      accounts: metamaskKey,
    },
    zkEvmTestnet: {
      url: `https://rpc.public.zkevm-test.net`,
      chainId: 1442,
      accounts: metamaskKey,
    },
    zkEvmMainnet: {
      url: `https://zkevm-rpc.com`,
      chainId: 1101,
      accounts: metamaskKey,
    },
  },
  etherscan: {
    apiKey: zkTestnet,
    customChains: [
      {
        network: "zkEvmTestnet",
        chainId: 1442,
        urls: {
          apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com",
        },
      },
      {
        network: "zkEvmMainnet",
        chainId: 1101,
        urls: {
          apiURL: "https://api-zkevm.polygonscan.com/api",
          browserURL: "https://zkevm.polygonscan.com",
        },
      },
    ],
  },
  preprocess: {
    eachLine: (hre) => ({
      transform: (line) => {
        if (line.match(/ from "/i)) {
          getRemappings().forEach(([find, replace]) => {
            if (line.match(find)) {
              line = line.replace(find, replace);
            }
          });
        }
        return line;
      },
    }),
  },
  paths: {
    sources: "src/contracts",
    tests: "src/test",
    cache: "./cache",
    artifacts: "src/artifacts",
  },
};
