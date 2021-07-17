'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pnls', [
      { historicalDataId: 1, date: '2021-07-05 00:01:00', usdValue: 5.15 },
      { historicalDataId: 1, date: '2021-06-17 00:01:00', usdValue: 8.15 },
      { historicalDataId: 1, date: '2021-06-18 00:01:00', usdValue: -6.15 },
      { historicalDataId: 1, date: '2021-06-19 00:01:00', usdValue: 2.15 },
      { historicalDataId: 1, date: '2021-06-20 00:01:00', usdValue: -56.15 },
      { historicalDataId: 1, date: '2021-06-21 00:01:00', usdValue: 6.15 },
      { historicalDataId: 1, date: '2021-06-22 00:01:00', usdValue: -1.15 },
      { historicalDataId: 1, date: '2021-06-23 00:01:00', usdValue: -4.15 },
      { historicalDataId: 1, date: '2021-06-24 00:01:00', usdValue: 3.15 },
      { historicalDataId: 1, date: '2021-06-25 00:01:00', usdValue: 6.15 },
      { historicalDataId: 1, date: '2021-06-26 00:01:00', usdValue: 12.15 },
      { historicalDataId: 1, date: '2021-06-27 00:01:00', usdValue: 24.15 },
      { historicalDataId: 1, date: '2021-06-28 00:01:00', usdValue: 36.15 },
      { historicalDataId: 1, date: '2021-06-29 00:01:00', usdValue: 64.15 },
      { historicalDataId: 1, date: '2021-06-30 00:01:00', usdValue: 75.15 },
      { historicalDataId: 1, date: '2021-07-01 00:01:00', usdValue: 99.15 },
      { historicalDataId: 1, date: '2021-07-02 00:01:00', usdValue: 101.15 },
      { historicalDataId: 1, date: '2021-07-03 00:01:00', usdValue: -43.15 },
      { historicalDataId: 1, date: '2021-07-04 00:01:00', usdValue: -33.15 },
      { historicalDataId: 1, date: '2021-07-05 00:01:00', usdValue: -12.15 },
      { historicalDataId: 1, date: '2021-07-06 00:01:00', usdValue: -4.15 },
      { historicalDataId: 1, date: '2021-07-07 00:01:00', usdValue: 4.15 },
      { historicalDataId: 1, date: '2021-07-08 00:01:00', usdValue: 12.15 },
      { historicalDataId: 1, date: '2021-07-09 00:01:00', usdValue: 19.15 },
      { historicalDataId: 1, date: '2021-07-10 00:01:00', usdValue: 28.15 },
      { historicalDataId: 1, date: '2021-07-11 00:01:00', usdValue: 56.15 },
      { historicalDataId: 1, date: '2021-07-12 00:01:00', usdValue: -85.15 },
      { historicalDataId: 1, date: '2021-07-13 00:01:00', usdValue: -8.15 },
      { historicalDataId: 1, date: '2021-07-14 00:01:00', usdValue: 5.15 },
      { historicalDataId: 1, date: '2021-07-15 00:01:00', usdValue: -3.15 },
      { historicalDataId: 1, date: '2021-07-16 00:01:00', usdValue: 15.15 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('pnls', null, {});
  },
};
