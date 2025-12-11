'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      Orders.belongsTo(models.Users, { as: 'user', foreignKey: 'userId' });
      Orders.hasMany(models.OrderDetails, { as: 'details', foreignKey: 'orderId' });
    }
  }
  Orders.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    total: DataTypes.DECIMAL(10, 2),
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};