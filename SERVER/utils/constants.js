const ENUM_LISTING_TYPE = ['SALE', 'RENTAL']

const ENUM_STATUS_PROPERTY = ['PENDING', 'CANCEL', 'APPROVED']

const roles = [
    {
        code: 'ADMIN',
        value: 'Admin'  // ROL1
    },
    {
        code: 'PROPERTY_OWNER', // ROL3
        value: 'Owner'
    },
    {
        code: 'AGENT',  // ROL5
        value: 'Agent'
    },
    {
        code: 'CUSTOMER', // ROL7
        value: 'Customer'
    },
]




module.exports = {
    ENUM_STATUS_PROPERTY,
    ENUM_LISTING_TYPE,
    roles,
}

