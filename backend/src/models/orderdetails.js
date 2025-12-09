'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class orderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  orderDetails.init({
    idOrderDetails: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unitprice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subToal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productNotes: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'orderDetails'
  })
  return orderDetails
}
