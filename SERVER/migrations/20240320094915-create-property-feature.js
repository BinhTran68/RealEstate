'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Property_Features', {
      propertyId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Properties',
          key: 'id'
        }
      },
      featureId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Features',
          key: 'id'
        }
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
    await queryInterface.dropTable('Property_Features');
  }
};