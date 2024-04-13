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
    propertyTypeId: DataTypes.UUID,
    status: {
      type: DataTypes.ENUM,
      values: ENUM_STATUS_PROPERTY
    },
    isAvailable : DataTypes.BOOLEAN,
    images : {
      type : DataTypes.TEXT,
      get() {
        const rawValue  = this.getDataValue('images')  // Get a Array in database. convert array to Json
        return rawValue ? JSON.parse(rawValue) : []
      },
      set(arraysImages) {
        this.setDataValue('images', JSON.stringify(arraysImages))  // When set value to images column then set Json object images parseString then save to database
      }
    },
    featureImages : DataTypes.STRING,
    bedRoom : DataTypes.INTEGER,
    bathRoom : DataTypes.INTEGER,
    propertySize : DataTypes.FLOAT,
    yearBuild : DataTypes.INTEGER,
    owner: DataTypes.UUID,  // Migration 20240323152748-modify_property_add_cloumn_ower.js
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};