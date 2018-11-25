const IPFS = require('ipfs-api');
const mfs = require('ipfs-mfs');

const api = IPFS('/ip4/127.0.0.1/tcp/5001');

module.exports = {
  api,
  mfs,
};
