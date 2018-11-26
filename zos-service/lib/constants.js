import * as config from '../truffle-config.js';

export const ACTIVE_NETWORK = config.networks.local;
// export const ACTIVE_NETWORK = config.networks.ropsten;
// export const ACTIVE_NETWORK = config.networks.rinkeby;
// export const ACTIVE_NETWORK = config.networks.mainnet;

const deployData = require(`../zos.${ACTIVE_NETWORK.name}.json`);
export const EXAMPLE_CONTRACT_ADDRESS =
  deployData.contracts.ExampleContract.address;
export const EXAMPLE_CONTRACT_PROXY_ADDRESS =
  deployData.proxies['zos-service/ExampleContract'][0].address;
