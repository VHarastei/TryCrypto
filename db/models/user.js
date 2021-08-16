'use strict';
const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verifyHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    invitedBy: {
      type: DataTypes.STRING,
    },
    referralLink: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: Math.random().toString(36).substring(2),
    },
  });
  // User.beforeSave((user, _) => {
  //   return (user.referralLink = Math.random().toString(36).substring(2));
  // });

  User.associate = (models) => {
    User.hasMany(models.Asset, { as: 'assets', foreignKey: 'userId' });
    User.hasOne(models.HistoricalData, { as: 'historicalData', foreignKey: 'userId' });
  };

  return User;
};
