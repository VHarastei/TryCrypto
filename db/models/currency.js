'use strict';

module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define(
    'Currency',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: DataTypes.STRING,
      symbol: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  Currency.associate = (models) => {
    Currency.hasMany(models.Asset, { as: 'currency', foreignKey: 'currencyId' });
  };

  return Currency;
};
