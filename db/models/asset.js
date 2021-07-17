'use strict';

module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    amount: DataTypes.DOUBLE,
  });

  Asset.associate = (models) => {
    Asset.belongsTo(models.User, { as: 'assets', foreignKey: 'userId' });
    Asset.belongsTo(models.Currency, { as: 'currency', foreignKey: 'currencyId' });
    Asset.hasMany(models.Transaction, { as: 'transactions', foreignKey: 'assetId' });
  };

  return Asset;
};
