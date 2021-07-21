'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
      source: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      usdValue: {
        type: Sequelize.DOUBLE,
      },
      amount: {
        type: Sequelize.DOUBLE,
      },
      total: {
        type: Sequelize.DOUBLE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  },
};
