'use strict';
const {roles} = require("../utils/constants");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()")
      },
      name: {
        type: Sequelize.STRING, allowNull: false
      },
      phone: {
        type: Sequelize.STRING,  allowNull: false, unique: true
      },
      email: {
        type: Sequelize.STRING, allowNull: true, unique: true
      },
      address: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING, allowNull: false, unique: true
      },
      roleCode: {
        type: Sequelize.STRING,
        references: {
          model: 'Roles',
          key: 'code'
        },
        defaultValue: "CLIENT" // Default register is CLIENT

      },
      avatar: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};