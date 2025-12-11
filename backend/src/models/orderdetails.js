'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    static associate(models) {
      OrderDetails.belongsTo(models.Orders, { as: 'order', foreignKey: 'orderId' });
      OrderDetails.belongsTo(models.Products, { as: 'product', foreignKey: 'productId' });
    }
  }
  OrderDetails.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'OrderDetails',
  });
  return OrderDetails;
};