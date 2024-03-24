const ENUM_LISTING_TYPE = ['SALE', 'RENTAL']

const ENUM_STATUS_PROPERTY = ['PENDING', 'CANCEL', 'APPROVED']

const roles = [
    {
        code: 'ADMIN',
        value: 'Quản Trị Viên'  // ROL1
    },
    {
        code: 'PROPERTY_OWNER', // ROL3
        value: 'Chủ tài sản'
    },
    {
        code: 'BROKER',  // ROL5
        value: 'Người môi giới'
    },
    {
        code: 'CLIENT', // ROL7
        value: 'Khách hàng'
    },
]




module.exports = {
    ENUM_STATUS_PROPERTY,
    ENUM_LISTING_TYPE,
    roles,
}

