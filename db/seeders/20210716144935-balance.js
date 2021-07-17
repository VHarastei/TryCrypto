'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('balances', [
      { historicalDataId: 1, date: '2021-06-16 00:01:00', usdValue: 32.236358 },
      { historicalDataId: 1, date: '2021-06-17 00:01:00', usdValue: 32.278343 },
      { historicalDataId: 1, date: '2021-06-18 00:01:00', usdValue: 32.258332 },
      { historicalDataId: 1, date: '2021-06-19 00:01:00', usdValue: 32.249917 },
      { historicalDataId: 1, date: '2021-06-20 00:01:00', usdValue: 32.180415 },
      { historicalDataId: 1, date: '2021-06-21 00:01:00', usdValue: 32.170041 },
      { historicalDataId: 1, date: '2021-06-22 00:01:00', usdValue: 32.177943 },
      { historicalDataId: 1, date: '2021-06-23 00:01:00', usdValue: 32.216686 },
      { historicalDataId: 1, date: '2021-06-24 00:01:00', usdValue: 32.261677 },
      { historicalDataId: 1, date: '2021-06-25 00:01:00', usdValue: 32.238888 },
      { historicalDataId: 1, date: '2021-06-26 00:01:00', usdValue: 32.227589 },
      { historicalDataId: 1, date: '2021-06-27 00:01:00', usdValue: 32.173514 },
      { historicalDataId: 1, date: '2021-06-28 00:01:00', usdValue: 32.117514 },
      { historicalDataId: 1, date: '2021-06-29 00:01:00', usdValue: 32.122082 },
      { historicalDataId: 1, date: '2021-06-30 00:01:00', usdValue: 32.137169 },
      { historicalDataId: 1, date: '2021-07-01 00:01:00', usdValue: 32.156011 },
      { historicalDataId: 1, date: '2021-07-02 00:01:00', usdValue: 32.105094 },
      { historicalDataId: 1, date: '2021-07-03 00:01:00', usdValue: 32.080475 },
      { historicalDataId: 1, date: '2021-07-04 00:01:00', usdValue: 32.044916 },
      { historicalDataId: 1, date: '2021-07-05 00:01:00', usdValue: 31.942403 },
      { historicalDataId: 1, date: '2021-07-06 00:01:00', usdValue: 31.937729 },
      { historicalDataId: 1, date: '2021-07-07 00:01:00', usdValue: 31.944122 },
      { historicalDataId: 1, date: '2021-07-08 00:01:00', usdValue: 31.949071 },
      { historicalDataId: 1, date: '2021-07-09 00:01:00', usdValue: 31.983477 },
      { historicalDataId: 1, date: '2021-07-10 00:01:00', usdValue: 29.324721 },
      { historicalDataId: 1, date: '2021-07-11 00:01:00', usdValue: 29.123425 },
      { historicalDataId: 1, date: '2021-07-12 00:01:00', usdValue: 30.934634 },
      { historicalDataId: 1, date: '2021-07-13 00:01:00', usdValue: 33.768678 },
      { historicalDataId: 1, date: '2021-07-14 00:01:00', usdValue: 34.345467 },
      { historicalDataId: 1, date: '2021-07-15 00:01:00', usdValue: 31.134535 },
      { historicalDataId: 1, date: '2021-07-16 00:01:00', usdValue: 30.323346 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('balances', null, {});
  },
};
