'use strict';
const {ENUM_STATUS_PROPERTY, ENUM_LISTING_TYPE} = require("../utils/constants");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()")
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      listingType: {
        type: Sequelize.ENUM(ENUM_LISTING_TYPE),
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      propertyTypeId: {
        type: Sequelize.UUID,
        references: {
          model: "PropertyTypes",
          key: "id"
        }
      },
      status: {
        type: Sequelize.ENUM(ENUM_STATUS_PROPERTY),
        allowNull: false,
        defaultValue: 'PENDING'
      },
      isAvailable: {
        type: Sequelize.BOOLEAN, // When real estate soled or Leased Agent then set isAvailable == false
        allowNull: false,
      },
      images: {
        type: Sequelize.TEXT, // When real estate soled or Leased Agent then set isAvailable == false
        allowNull: false,
      },
      featureImages: {
        type: Sequelize.TEXT, // When real estate soled or Leased Agent then set isAvailable == false
        allowNull: false,
      },
      postedBy: {
        type: Sequelize.UUID, // Who poster?
        references: {
          model: "Users",
          key: "id"
        }
      },
      bedRoom: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      bathRoom: {
        type: Sequelize.INTEGER,
      },
      propertySize: {
        type: Sequelize.FLOAT,
      },
      yearBuild: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Properties');
  }
};