'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'HistoricalData', // name of Source model
        'userId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
      .then(() => {
        return queryInterface.addColumn(
          'Balances', // name of Source model
          'historicalDataId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'HistoricalData', // name of Target model
              key: 'id', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        return queryInterface.addColumn(
          'PNLs', // name of Source model
          'historicalDataId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'HistoricalData', // name of Target model
              key: 'id', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        'HistoricalData', // name of Source model
        'userId' // key we want to remove
      )
      .then(() => {
        queryInterface.removeColumn(
          'Balances', // name of Source model
          'historicalDataId' // key we want to remove
        );
      })
      .then(() => {
        queryInterface.removeColumn(
          'PNLs', // name of Source model
          'historicalDataId' // key we want to remove
        );
      });
  },
};
