const jwt = require("jsonwebtoken");
const {SECERT_KEY} = require("../config")

const generateToken = (data) => jwt.sign(data,SECERT_KEY, {expiresIn : "24h"});
const createUserJwt = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
    }
    return generateToken(payload);
}
const validateToken = (token) => {
    try{
        const decode = jwt.vertify(token,SECERT_KEY);
       return decode;

   }catch(err){
    console.log(err);
    return {};
   }

}

module.exports = {
    generateToken,
    createUserJwt,
    validateToken
}