# Voting DApp project

## Media

## General Information
This project has been done to practice DApp development. The smart contract used is a simple voting contract which allows the owner to manage a voting session. The owner can register addresses and trigger next sessions until the final tally session. The registered addresses can add proposals to the vote session and then vote for one proposal, there is only one winner.

## Contract Improvements
The initial Voting contract has been updated in order to fix a potential issue: the proposal amount is now limited to one hundred instead of an unlimited size that could lead to a DOS memory attack.

## Technologies Used
* Solidity
* Javascript
* Truffle
* React
* Web3
* Material UI

## Contract address
The contract is deployed in the Goerli testnet at :

## Local deployment
You can deploy the contract in your local environment using the following comands:
```sh 
cd truffle
npm run migrate --network=development
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

## Tests
#### Gas Reporter
![alt test](https://github.com/PhilippePaulos/voting-dapp/blob/main/test/gas-reporter.PNG)

#### Coverage
![alt test](https://github.com/PhilippePaulos/voting-dapp/blob/main/test/coverage.PNG)
