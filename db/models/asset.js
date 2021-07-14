'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    amount: DataTypes.DOUBLE,
  });

  Asset.associate = (models) => {
    Asset.belongsTo(models.User, { foreignKey: 'userId' });
    Asset.belongsTo(models.Currency, { as: 'currency', foreignKey: 'currencyId' });
  };

  return Asset;
};
