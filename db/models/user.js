'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Asset, { as: 'assets', foreignKey: 'userId' });
    User.hasOne(models.HistoricalData, { as: 'historicalData', foreignKey: 'userId' });
  };

  return User;
};
