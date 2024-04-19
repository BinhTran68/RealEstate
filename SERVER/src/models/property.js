'use strict';
const {
  Model
} = require('sequelize');
const {ENUM_LISTING_TYPE, ENUM_STATUS_PROPERTY} = require("../utils/constants");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Property.belongsTo(models.User, { foreignKey: 'postedBy', as : 'property_user_posted' })
      Property.belongsTo(models.User, { foreignKey: 'owner', as : 'property_user_owner' })
      Property.hasMany(models.Image, { foreignKey: 'propertyId', as: 'property_images' });
    }
  }
  Property.init({
    name : DataTypes.STRING,
    description : DataTypes.TEXT,
    listingType: {
      type: DataTypes.ENUM,
      values: ENUM_LISTING_TYPE
    },
    price: DataTypes.FLOAT,
    propertyTypeId: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: ENUM_STATUS_PROPERTY
    },
    isAvailable : DataTypes.BOOLEAN,
    featureImages : DataTypes.STRING,
    bedRoom : DataTypes.INTEGER,
    bathRoom : DataTypes.INTEGER,
    propertySize : DataTypes.FLOAT,
    yearBuild : DataTypes.INTEGER,
    owner: DataTypes.INTEGER,  // Migration 20240323152748-modify_property_add_cloumn_ower.js
    postedBy: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};