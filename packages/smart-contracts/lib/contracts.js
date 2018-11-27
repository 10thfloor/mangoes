import Network from './network';
import contract from 'truffle-contract';

const provider = Network.provider();

const ExampleContract = contract(
  require('../build/contracts/ExampleContract.json'),
);

ExampleContract.setProvider(provider);

export { ExampleContract };
