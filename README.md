# starterkit_solidity_react

## Execution:
* Modifier le fichier .env et l'ajouter dans le .gitignore
```
npm install
truffle compile
truffle migrate (facultatif: --network development --reset)
cd client
npm install
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
$ npm i webpack@4.41.0
$ truffle init
$ truffle unbox react
$ cd client
$ npm i --save styled-components
$ npm i react-router-dom
```
* Modification du SC (Ex: Création d'un ERC20)
* Modification du App.js
* Ajout de routes
* Ajout de styles
* Création des Components
```
$ truffle compile
$ truffle migrate --network development
```
