const jwt =  require('jsonwebtoken');
const UserModel = require("../models/user.model");

module.exports.checkUser = function(req, res, next){
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET,async (err, decodedToken) =>{
            if(err){
                res.locals.user = null
                res.cookie('jwt', '',{maxAge: 1 })
                next()
            }
            else{
                let user = await UserModel.findById(decodedToken.id).exec()
                res.locals.user = user
                console.log(res.locals.user)
                next()
            }
        })
    }
    else{
        console.log('pas de token')
        res.locals.user = null
        next()
    }
}

module.exports.requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET,(err, decodedToken) =>{
            if(err){
                console.log(err)
            }
            else{
                console.log(decodedToken.id)
                next()
            }
        })
    }
    else{
        console.log('pas de token')
    }
}