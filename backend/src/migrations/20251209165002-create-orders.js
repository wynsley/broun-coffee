'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      idOrders: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      orderDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      deliveryType: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      deliveryAddress: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      notes: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      deliveryDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders')
  }
}
