require('babel-register');
require('babel-polyfill');

const { ExampleContract } = require('./lib/contracts');
module.exports = { ExampleContract };
