# Voting DApp project

## General Information
This project has been done to practice DApp development. The smart contract used is a simple voting contract which allows the owner to manage a voting session. The owner can register addresses and trigger next sessions until the final tally session. The registered addresses can add proposals to the vote session and then vote for one proposal, there is only one winner.

## Media
https://app.videas.fr/v/1be2882b-29c2-41c3-a189-1cb3c76c0ae8/

## Website
https://voting-dapp-zeta.vercel.app/

## Voting contract
### Improvements
* The initial Voting contract has been updated in order to fix a potential issue: the proposal amount is now limited to one hundred instead of an unlimited size that could lead to a DOS memory attack.
* Change the uint256 type to uint8 for the proposal id as we don't have as the maximum amount of proposals is 100
* Use of variable packing to optimize the contract slots used

### Docs
[Voting.md](https://github.com/PhilippePaulos/voting-dapp/blob/main/client/src/contracts/Voting.md)

### Contract address
The contract is deployed in the Goerli testnet at [0x5312bB8D0045fF340FAE3b20Fa8138e5B3C1999b](https://goerli.etherscan.io/address/0x5312bB8D0045fF340FAE3b20Fa8138e5B3C1999b)

## Technologies
* Solidity
* Javascript
* Truffle
* React
* Web3
* Material UI

## Local deployment

### Contract
You can deploy the contract in your local environment using the following comands:
```sh 
cd truffle && npm run migrate --network=development
```

Make sure that you have a local blockchain running in your machine and feel free to update the truffle-config.js file in order to match your local configuration:
```js
networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    ...
}
```

### Application
```sh 
cd client && npm install && npm start
```

## Gas Reporter
![alt test](https://github.com/PhilippePaulos/voting-dapp/blob/main/truffle/test/gas-reporter.PNG)

