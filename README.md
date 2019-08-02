# Proof-Of-Existance Dapp

## Overview
Combining IPFS and Ethereum allows us to verify the existence of a file. IPFS provides us an hash, Ethereum due to its immutability stores the files' hashes and timestamps useful for verification about the files. the authenticity.


## Rinkeby Deploy
[Link to my smart contract on rinkeby](https://etherscan.io/address/0xb3294a622ed39f3718753f0b8a7487C41E189e8b)

The address on rinkeby is: 0xb3294a622ed39f3718753f0b8a7487C41E189e8b

### Requirements

What things you need to install the software and how to install them

* [nodejs](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)
* [Truffle](https://truffleframework.com/docs/truffle/getting-started/installation)
* [ganache-cli](https://github.com/trufflesuite/ganache-cli) - ganache

### Installation

A step by step series of examples that tell you how to get a development env running

Clone the project repository and install node modules

```
npm install
```

Compile smart contract

```
truffle compile
```

Run a development blockchain network

```
ganache-cli
```

Migrate smart contracts

```
truffle migrate
```

Start Dapp

```
npm run dapp
```

The dapp is available at

```
http://localhost:3000/
```

## Tests


Run tests

```
truffle test
```


## Built With

* [Solidity](https://reactjs.org/docs/getting-started.html)
* [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)
* [ReactJS](https://reactjs.org/docs/getting-started.html)
* [Metamask](https://reactjs.org/docs/getting-started.html)
* [IPFS](https://reactjs.org/docs/getting-started.html)


## Authors

* **Elisa Romondia** - [elisaromondia](https://github.com/elisaromondia)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
