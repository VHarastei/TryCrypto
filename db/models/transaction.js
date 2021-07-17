'use strict';

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      date: DataTypes.DATE,
      source: DataTypes.STRING,
      type: DataTypes.STRING,
      usdValue: DataTypes.DOUBLE,
      amount: DataTypes.DOUBLE,
    },
    {
      timestamps: false,
    }
  );

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Asset, {
      as: 'transactions',
      foreignKey: 'assetId',
    });
  };

  return Transaction;
};
