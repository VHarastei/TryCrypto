'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Currency.hasMany(models.Asset, { as: 'currency', foreignKey: 'currencyId' });
    }
  }
  Currency.init(
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
      sequelize,
      timestamps: false,
      modelName: 'Currency',
    }
  );
  return Currency;
};
