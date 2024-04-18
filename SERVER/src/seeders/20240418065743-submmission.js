'use strict';
const {faker} = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tạo dữ liệu giả mạo cho các đệ trình (submissions)
    const submissionsData = Array.from({ length: 10 }).map(() => {
      return {
        propertyId: faker.random.number({ min: 1, max: 10 }), // ID của bất động sản được chọn ngẫu nhiên
        userId: faker.random.number({ min: 1, max: 10 }), // ID của người dùng được chọn ngẫu nhiên
        message: faker.lorem.paragraph(), // Nội dung tin nhắn được tạo ngẫu nhiên
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    // Thêm dữ liệu vào bảng Submissions
    await queryInterface.bulkInsert('Submissions', submissionsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa toàn bộ dữ liệu từ bảng Submissions khi rollback migration
    await queryInterface.bulkDelete('Submissions', null, {});
  }
};
