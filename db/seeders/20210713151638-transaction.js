'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('transactions', [
      {
        assetId: 1,
        date: '2021-07-05 00:01:00',
        source: 'market',
        type: 'buy',
        usdValue: 481.35,
        amount: 0.228006,
      },
      {
        assetId: 1,
        date: '2021-07-09 00:01:00',
        source: 'market',
        type: 'buy',
        usdValue: 586.11,
        amount: 0.291234,
      },
      {
        assetId: 1,
        date: '2021-07-11 00:01:00',
        source: 'market',
        type: 'sell',
        usdValue: 100.03,
        amount: 0.063228,
      },
      {
        assetId: 2,
        date: '2021-06-05 00:01:00',
        source: 'market',
        type: 'buy',
        usdValue: 503.11,
        amount: 430.004352,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transactions', null, {});
  },
};
