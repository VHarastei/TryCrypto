'use strict';

module.exports = (sequelize, DataTypes) => {
  const Balance = sequelize.define(
    'Balance',
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      usdValue: {
        type: DataTypes.DOUBLE,
      },
    },
    {
      timestamps: false,
    }
  );

  Balance.associate = (models) => {
    Balance.belongsTo(models.HistoricalData, { as: 'balance', foreignKey: 'historicalDataId' });
  };

  return Balance;
};
