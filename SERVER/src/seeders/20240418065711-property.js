'use strict';
const { faker } = require('@faker-js/faker');
const { ENUM_STATUS_PROPERTY, ENUM_LISTING_TYPE } = require("../utils/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tạo dữ liệu giả mạo cho các bất động sản (properties)
    const propertiesData = Array.from({ length: 100 }).map(() => {
      return {
        name: faker.location.street(), // Tên bất động sản được tạo ngẫu nhiên
        address: faker.location.streetAddress(), // Địa chỉ bất động sản được tạo ngẫu nhiên
        description: faker.lorem.paragraph(), // Mô tả bất động sản được tạo ngẫu nhiên
        listingType: "SALE", // Loại liệt kê được chọn ngẫu nhiên từ ENUM_LISTING_TYPE
        price: faker.datatype.number({ min: 10000, max: 100000 }), // Giá bất động sản được tạo ngẫu nhiên
        propertyTypeId: faker.datatype.number({ min: 1, max: 3 }), // ID của loại bất động sản được chọn ngẫu nhiên
        owner: faker.datatype.number({ min: 2, max: 10 }), // ID của chủ sở hữu được chọn ngẫu nhiên
        status: "PENDING", // Trạng thái bất động sản được chọn ngẫu nhiên từ ENUM_STATUS_PROPERTY
        isAvailable: true, // Bất động sản có sẵn hay không
        featureImages: faker.image.urlLoremFlickr({ category : "real estate"}), // URL hình ảnh đặc trưng của bất động sản được tạo ngẫu nhiên
        postedBy: faker.datatype.number({ min: 2, max: 10 }), // ID của người đăng bài được chọn ngẫu nhiên
        bedRoom: faker.datatype.number({ min: 1, max: 5 }), // Số phòng ngủ được tạo ngẫu nhiên
        bathRoom: faker.datatype.number({ min: 1, max: 3 }), // Số phòng tắm được tạo ngẫu nhiên
        propertySize: faker.datatype.number({ min: 50, max: 200 }), // Diện tích bất động sản được tạo ngẫu nhiên
        yearBuild: faker.datatype.number({ min: 1970, max: 2022 }), // Năm xây dựng của bất động sản được tạo ngẫu nhiên
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    // Thêm dữ liệu vào bảng Properties
    await queryInterface.bulkInsert('Properties', propertiesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa toàn bộ dữ liệu từ bảng Properties khi rollback migration
    await queryInterface.bulkDelete('Properties', null, {});
  }
};
