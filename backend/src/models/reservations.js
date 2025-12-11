'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservations extends Model {
    static associate(models) {
      // define association here
    }
  }
  Reservations.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    customerName: DataTypes.STRING,
    customerEmail: DataTypes.STRING,
    customerPhone: DataTypes.STRING,
    numberOfPeople: DataTypes.INTEGER,
    reservationDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reservations',
  });
  return Reservations;
};