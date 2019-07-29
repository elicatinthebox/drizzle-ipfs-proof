import InterplanetaryStorage from "./contracts/InterplanetaryStorage.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
  contracts: [InterplanetaryStorage],
  events: {
    InterplanetaryStorage: ["LogUploadFile"],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
