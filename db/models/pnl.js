'use strict';

module.exports = (sequelize, DataTypes) => {
  const PNL = sequelize.define(
    'PNL',
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      usdValue: {
        type: DataTypes.DOUBLE,
      },
    },
    {
      timestamps: false,
    }
  );

  PNL.associate = (models) => {
    PNL.belongsTo(models.HistoricalData, { as: 'PNL', foreignKey: 'historicalDataId' });
  };

  return PNL;
};
