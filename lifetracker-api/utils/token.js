const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config")

const generateToken = (data) => jwt.sign(data, SECRET_KEY, {expiresIn : "30d"});
const createUserJwt = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
    }
    return generateToken(payload);
}
const validateToken = (token) => {
    try{
        const decode = jwt.verify(token,SECRET_KEY);
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