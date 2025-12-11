'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactMessage extends Model {
    static associate(models) {
      // define association here
    }
  }
  ContactMessage.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.TEXT,
    isRead: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ContactMessage',
  });
  return ContactMessage;
};