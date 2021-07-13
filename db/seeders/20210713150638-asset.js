'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('assets', [
      {
        amount: 0.456012,
        currencyId: 'ethereum',
        userId: 1,
        createdAt: '1970-01-01 00:00:01',
        updatedAt: '1970-01-01 00:00:01',
      },
      {
        amount: 430.004352,
        currencyId: 'cardano',
        userId: 1,
        createdAt: '1970-01-01 00:00:01',
        updatedAt: '1970-01-01 00:00:01',
      },
      {
        amount: 1.000324,
        currencyId: 'bitcoin',
        userId: 2,
        createdAt: '1970-01-01 00:00:01',
        updatedAt: '1970-01-01 00:00:01',
      },
      {
        amount: 5.234512,
        currencyId: 'bitcoin',
        userId: 3,
        createdAt: '1970-01-01 00:00:01',
        updatedAt: '1970-01-01 00:00:01',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('assets', null, {});
  },
};
