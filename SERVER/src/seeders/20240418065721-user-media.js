'use strict';
const {faker} = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tạo dữ liệu giả mạo cho các phương tiện của người dùng (user media)
    const userMediaData = Array.from({ length: 10 }).map(() => {
      return {
        userId: faker.random.number({ min: 1, max: 10 }), // ID của người dùng được chọn ngẫu nhiên
        provider: faker.random.arrayElement(['Facebook', 'Instagram', 'Twitter']), // Nhà cung cấp được chọn ngẫu nhiên
        link: faker.internet.url(), // Đường dẫn được tạo ngẫu nhiên
        icon: faker.image.imageUrl(), // Hình ảnh biểu tượng được tạo ngẫu nhiên
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    // Thêm dữ liệu vào bảng UserMedia
    await queryInterface.bulkInsert('UserMedia', userMediaData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa toàn bộ dữ liệu từ bảng UserMedia khi rollback migration
    await queryInterface.bulkDelete('UserMedia', null, {});
  }
};
