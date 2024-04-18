'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tạo dữ liệu giả mạo cho bảng Property_Features
    const propertyFeaturesData = Array.from({ length: 10 }).map(() => {
      return {
        propertyId: Math.floor(Math.random() * 10) + 1, // ID của bất động sản được chọn ngẫu nhiên
        featureId: Math.floor(Math.random() * 10) + 1, // ID của tính năng được chọn ngẫu nhiên
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    // Thêm dữ liệu vào bảng Property_Features
    await queryInterface.bulkInsert('Property_Features', propertyFeaturesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa toàn bộ dữ liệu từ bảng Property_Features khi rollback migration
    await queryInterface.bulkDelete('Property_Features', null, {});
  }
};
