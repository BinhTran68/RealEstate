module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tạo dữ liệu giả mạo cho bảng Images
    const imagesData = Array.from({ length: 10 }).map(() => {
      return {
        link: 'https://example.com/image.jpg', // Đường dẫn của hình ảnh
        propertyId: Math.floor(Math.random() * 10) + 1, // ID của bất động sản được chọn ngẫu nhiên
        isAvatar: Math.random() > 0.5 ? 'true' : 'false', // Có phải là hình đại diện hay không (ngẫu nhiên true hoặc false)
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    // Thêm dữ liệu vào bảng Images
    await queryInterface.bulkInsert('Images', imagesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa toàn bộ dữ liệu từ bảng Images khi rollback migration
    await queryInterface.bulkDelete('Images', null, {});
  }
};