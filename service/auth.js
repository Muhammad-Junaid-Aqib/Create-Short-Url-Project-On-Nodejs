// state manage kar rha hai
// const sessionIdToUserMap = new Map()

// const setUser = (id, user) => {
//     sessionIdToUserMap.set(id, user)
// }

// const getUser = (id) => {
//     return sessionIdToUserMap.get(id) || null;
// }
 
// module.exports = {
//     setUser,
//     getUser
// }

//// but now we use jsonWebToken(jwt) first we import jwt and then
//// use jwt
const jwt = require('jsonwebtoken')
const secret_Key = 'Abc@test.com%420'

const setUser = (user) => {
    const payload = {
        _id : user._id,
        email : user.email,
        role : user.role,
        

        /// if this not work uncomment the above code and comment it
        // ...user
    }
    return jwt.sign(payload, secret_Key)
}

const getUser = (token) => {
    if (!token) return null
    try {
        return jwt.verify(token, secret_Key);
    } catch (error) {
        return null
    }
}
 
module.exports = {
    setUser,
    getUser
}
