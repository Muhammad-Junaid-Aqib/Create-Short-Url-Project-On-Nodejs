const {
    setUser,
    getUser
} = require('../service/auth')

const restrictToLoginUserOnly = (req, res, next) => {
    const userUid = req.cookies?.uid
    if (!userUid) return res.redirect('/login')
    
    const user = getUser(userUid)
    if (!user) return res.redirect('/login')
    
    req.user = user
    next()
}

const checkAuth = async (req, res, next) => { 
    const userUid = req.cookies?.uid
    // if (!userUid) return res.redirect('/login')
    
    const user = getUser(userUid)
    // if (!user) return res.redirect('/login')
    
    req.user = user
    next()
}
 

module.exports = {
    restrictToLoginUserOnly,
    checkAuth
}