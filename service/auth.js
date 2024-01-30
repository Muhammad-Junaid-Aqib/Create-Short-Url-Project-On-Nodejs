const { model } = require("mongoose");

const sessionIdToUserMap = new Map()

const setUser = (id, user) => {
    sessionIdToUserMap.set(id, user)
}

const getUser = (id) => {
    return sessionIdToUserMap.get(id) || null;
}
 
module.exports = {
    setUser,
    getUser
}
