'use strict';

module.exports = (sequelize, DataTypes) => {
  const HistoricalData = sequelize.define('HistoricalData', {}, { timestamps: false });

  HistoricalData.associate = (models) => {
    HistoricalData.belongsTo(models.User, { as: 'historicalData' ,foreignKey: 'userId' });
    HistoricalData.hasMany(models.Balance, { as: 'balance', foreignKey: 'historicalDataId' });
    HistoricalData.hasMany(models.PNL, { as: 'PNL', foreignKey: 'historicalDataId' });
  };

  return HistoricalData;
};
