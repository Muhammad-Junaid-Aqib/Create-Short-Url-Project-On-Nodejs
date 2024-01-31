const { setUser, getUser } = require("../service/auth");

// const restrictToLoginUserOnly = (req, res, next) => {
//     const userUid = req.cookies?.uid
//     if (!userUid) return res.redirect('/login')

//     const user = getUser(userUid)
//     if (!user) return res.redirect('/login')

//     req.user = user
//     next()
// }

// const checkAuth = async (req, res, next) => {
//     const userUid = req.cookies?.uid
//     // if (!userUid) return res.redirect('/login')

//     const user = getUser(userUid)
//     // if (!user) return res.redirect('/login')

//     req.user = user
//     next()
// }

// module.exports = {
//     restrictToLoginUserOnly,
//     checkAuth
// }

// refactor our code

const checkForAuthentication = (req, res, next) => {
    const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();
    
    // const token = tokenCookie
    const user = getUser(tokenCookie)
    req.user = user

    return next()
};

const restrictTo = (roles) => {
    return (req, res, next) => {

        if (!req.user) return res.redirect('/login')
        
        if (!roles.includes(req.user.role)) {
            return res.end('authentication failed')
        }
        
        return next()
    }
}
module.exports = {
    checkForAuthentication,
    restrictTo
}