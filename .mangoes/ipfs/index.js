const IPFS = require('ipfs-api');
const api = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

module.exports = () => api;
