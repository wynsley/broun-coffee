'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    static associate(models) {
      // define association here
    }
  }
  Promotion.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    discountPercentage: DataTypes.FLOAT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Promotion',
  });
  return Promotion;
};