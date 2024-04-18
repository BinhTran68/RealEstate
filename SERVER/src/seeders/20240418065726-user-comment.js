'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tạo dữ liệu giả mạo cho các bình luận (comments)
    const commentsData = Array.from({ length: 10 }).map(() => {
      return {
        propertyId: faker.datatype.number({ min: 1, max: 10 }), // ID của bất động sản được chọn ngẫu nhiên
        userId: faker.datatype.number({ min: 1, max: 10 }), // ID của người dùng được chọn ngẫu nhiên
        parentComment: null, // Không có bình luận cha ban đầu
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    // Thêm dữ liệu vào bảng Comments
    await queryInterface.bulkInsert('Comments', commentsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa toàn bộ dữ liệu từ bảng Comments khi rollback migration
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
