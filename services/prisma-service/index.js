const { prisma } = require('./prisma-client-js');
module.exports = () => {
  return prisma;
};
