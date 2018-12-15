import * as config from '../truffle-config.js';

export const ACTIVE_NETWORK = config.networks.local;
// export const ACTIVE_NETWORK = config.networks.ropsten;
// export const ACTIVE_NETWORK = config.networks.rinkeby;
// export const ACTIVE_NETWORK = config.networks.mainnet;

let deployData = '';
try {
  deployData = require(`../zos.${ACTIVE_NETWORK.name}.json`);
} catch (e) {
  console.warn('Contracts have not been deployed.');
}

export let EXAMPLE_CONTRACT_ADDRESS = '';
export let EXAMPLE_CONTRACT_PROXY_ADDRESS = '';

if (deployData) {
  EXAMPLE_CONTRACT_ADDRESS = deployData.contracts.ExampleContract.address;
  if (deployData.proxies['zos-service/ExampleContract']) {
    EXAMPLE_CONTRACT_PROXY_ADDRESS =
      deployData.proxies['zos-service/ExampleContract'][0].address;
  }
}
