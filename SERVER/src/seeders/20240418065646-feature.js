'use strict';
const {faker} = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tạo dữ liệu giả mạo cho các tính năng (features)
    const featuresData = Array.from({ length: 10 }).map(() => {
      return {
        name: faker.lorem.words(2), // Tên tính năng được tạo ngẫu nhiên
        image: faker.image.imageUrl(), // URL của hình ảnh được tạo ngẫu nhiên
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    // Thêm dữ liệu vào bảng Features
    await queryInterface.bulkInsert('Features', featuresData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa toàn bộ dữ liệu từ bảng Features khi rollback migration
    await queryInterface.bulkDelete('Features', null, {});
  }
};