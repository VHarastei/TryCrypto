'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'assets', // name of Source model
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
          'assets', // name of Source model
          'currencyId', // name of the key we're adding
          {
            type: Sequelize.STRING,
            references: {
              model: 'Currencies', // name of Target model
              key: 'id', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        return queryInterface.addColumn(
          'transactions', // name of Source model
          'assetId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'assets', // name of Target model
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
        'assets', // name of Source model
        'userId' // key we want to remove
      )
      .then(() => {
        queryInterface.removeColumn(
          'assets', // name of Source model
          'currencyId' // key we want to remove
        );
      })
      .then(() => {
        queryInterface.removeColumn(
          'transactions', // name of Source model
          'assetId' // key we want to remove
        );
      });
  },
};
