'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Asset.belongsTo(models.User);
      Asset.belongsTo(models.Currency);
    }
  }
  Asset.init(
    {
      amount: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: 'Asset',
    }
  );
  return Asset;
};
