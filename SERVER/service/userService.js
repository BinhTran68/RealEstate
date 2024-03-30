const db = require("../models")

const getUserByID = async (uuid) => {
    const joinWithRole = {
        model: db.Role,
        as: 'Roles',
        attributes: ['value'],
    }
    const joinWithUserRole = {
        model: db.User_Role, attributes: ['roleCode'], as: 'userRoles',
        include: [
            joinWithRole
        ],
    }
    const response = await db.User.findByPk(uuid, {
        attributes: {
            exclude: ["password"]
        },
        include: [
            joinWithUserRole
        ],
    });
    return response ?? null;
}

module.exports = {
    getUserByID
}