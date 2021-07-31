'use strict';

module.exports = (sequelize, DataTypes) => {
  const Watch = sequelize.define('Watch', {}, { updatedAt: false });

  Watch.associate = (models) => {
    Watch.belongsTo(models.User, { as: 'watchlist', foreignKey: 'userId' });
    Watch.belongsTo(models.Currency, { as: 'currency', foreignKey: 'currencyId' });
  };

  return Watch;
};
