const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');
const { UnauthorizedError} = require('../utils/errors');

const jwtFrom = ({headers}) => {
    //console.log("HEADERS: " , headers);
    if (headers?.authorization){
        //console.log("HEADERS: " + headers);
        const [scheme, token] = headers.authorization.split(" ");
        if(scheme.trim() === "Bearer"){
            return token;
        }
    }
    return undefined;
}

const extractUserFromJwt = (req,res,next) => {
    try{
        const token = jwtFrom(req);
       // console.log("TOKEN: " + token);
        if(token){
            res.locals.user = jwt.verify(token, SECRET_KEY);
            //console.log("RESQUESTS: ", token , res.locals.user)
        }
        return next();
        
    }catch(err){
        return next();
    }
}

const requireAuthenticatedUser = (req,res,next) => {
    try{
        const user  = res.body
        //console.log("res: " , user);
        if(!user?.email){
            throw new UnauthorizedError();
        }
        return next();
    }catch(err){
        return next(err);
    }
}

module.exports = {
    extractUserFromJwt,
    requireAuthenticatedUser

}
