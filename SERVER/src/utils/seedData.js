const {faker} = require("@faker-js/faker")
const bcrypt = require("bcrypt");
const roles = [];


const hashPassword = (value) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(value, salt)
}


const users =
    Array.from([...Array(10).keys()]).map(() => {

        return {
            name: faker.person.fullName(),
            phone: "0" + faker.string.numeric(9),
            email: faker.internet.email({
                provider: "gmail.com",
                allowSpecialCharacters: false
            }),
            address: faker.location.streetAddress({
                useFullAddress: true
            }),
            password: hashPassword("123456"),
            avatar: faker.image.avatar(),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })


const user_roles = [
    ...Array.from([...Array(10).keys()]).map((el) => {
        return {
            userId: el + 1,
            roleCole: "PROPERTY_OWNER",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })
];

module.exports = {
    roles,
    users,
    user_roles
}

