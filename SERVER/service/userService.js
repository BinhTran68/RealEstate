const  db = require("../models")

const getUserByID =  async (uuid) => {
    const response = await db.User.findByPk(uuid, {
        attributes: {
            exclude: ["password"]
        }
    });
    return response ?? null;
}

module.exports = {
    getUserByID
}