'use strict';
const {faker} = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tạo dữ liệu giả mạo cho các loại bất động sản (property types)
    const propertyTypesData = [
      {
        name: 'House',
        description: 'A single-family detached home.',
        image: 'https://example.com/house.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Apartment',
        description: 'A self-contained housing unit that occupies part of a building.',
        image: 'https://example.com/apartment.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Condo',
        description: 'A privately owned individual unit in a multi-unit building.',
        image: 'https://example.com/condo.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Thêm các loại bất động sản khác tại đây nếu cần
    ];

    // Thêm dữ liệu vào bảng PropertyTypes
    await queryInterface.bulkInsert('PropertyTypes', propertyTypesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa toàn bộ dữ liệu từ bảng PropertyTypes khi rollback migration
    await queryInterface.bulkDelete('PropertyTypes', null, {});
  }
};
