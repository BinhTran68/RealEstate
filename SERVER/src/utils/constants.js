const  { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')
const  hashPassword = pwd => bcrypt.hashSync(pwd, bcrypt.genSaltSync(10))

const ENUM_LISTING_TYPE = ['SALE', 'RENTAL']

const ENUM_STATUS_PROPERTY = ['PENDING', 'CANCEL', 'APPROVED']

const roles = [
    {
        code: 'ADMIN',
        value: 'Admin',  // ROL1
    },
    {
        code: 'PROPERTY_OWNER', // ROL3
        value: 'Owner',

    },
    {
        code: 'AGENT',  // ROL5
        value: 'Agent',
    },
    {
        code: 'CUSTOMER', // ROL7
        value: 'Customer',
    },
]

// const users = Array.from([...Array(10).keys()]).map(() => {
//     return {
//         name: faker.person.fullName(),
//         phone: '0' + faker.string.numeric(9),
//         email: faker.internet.email({provider: 'gmail.com', allowSpecialCharacters:  false}),
//         address: faker.location.streetAddress({useFullAddress: true}),
//         password: hashPassword('123456'),
//         avatar: faker.image.avatar(),
//     }
//
// })
//
// const user_roles =  Array.from([...Array(10).keys()]).map((el) => {
//     return {
//         userId: el + 1,
//         roleCode: 'CUSTOMER'
//     }
// })





module.exports = {
    roles,
    ENUM_LISTING_TYPE,
    ENUM_STATUS_PROPERTY

}

