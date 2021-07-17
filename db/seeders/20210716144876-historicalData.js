'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('historicalData', [
      { userId: 1 },
      { userId: 2 },
      { userId: 3 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('historicalData', null, {});
  },
};
