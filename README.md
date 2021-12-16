# starterkit_solidity_react

## Execution:
* Modifier le fichier .env
```
npm install
truffle compile
truffle migrate (facultatif: --network development --reset)
cd client
npm start
```
***
### Installation faites en amont:
```
$ npm init
$ npm i @openzeppelin/contracts
$ npm i --save-dev @openzeppelin/test-helpers
$ npm i truffle -g
$ npm i @truffle/hdwallet-provider
$ npm i dotenv
$ truffle init
$ truffle unbox react
$ cd client
$ npm install --save styled-components
```
* Modification du SM (Ex: Création d'un ERC20)
* Modification du App.js
* Ajout de globalStyles.js
* Création des Components
```
$ truffle compile
$ truffle migrate --network development
```