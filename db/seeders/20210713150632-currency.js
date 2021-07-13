'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('currencies', [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'btc',
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'eth',
      },
      {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ada',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('currencies', null, {});
  },
};
