# Voting DApp project
## Media
https://app.videas.fr/v/33b4fd10-5123-4b75-a998-bf492451099c/


## General Information
This project has been done to practice DApp development. The smart contract used is a simple voting contract which allows the owner to manage a voting session. The owner can register addresses and trigger next sessions until the final tally session. The registered addresses can add proposals to the vote session and then vote for one proposal, there is only one winner.

## Contract Improvements
* The initial Voting contract has been updated in order to fix a potential issue: the proposal amount is now limited to one hundred instead of an unlimited size that could lead to a DOS memory attack.
* Change the uint256 type to uint8 for the proposal id as we don't have as the maximum amount of proposals is 100
* Use of variable packing to optimize the contract slots used

## Technologies
* Solidity
* Javascript
* Truffle
* React
* Web3
* Material UI

## Contract address
The contract is deployed in the Goerli testnet at 0xDe9ad3b9E72Ad640eE4057216aF77858B4fa5E8b

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

## Tests
#### Gas Reporter
![alt test](https://github.com/PhilippePaulos/voting-dapp/blob/main/truffle/test/gas-reporter.PNG)

#### Coverage
![alt test](https://github.com/PhilippePaulos/voting-dapp/blob/main/truffle/test/coverage.PNG)
