const User = require('../models/user')
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const {createUserJwt, validateToken} = require('../utils/token');
const security = require('../middleware/security')
const {SECRET_KEY} = require('../config');
const router = express.Router();

router.use(cors())
router.use(express.json())


router.get('/me', async (req,res) => {
    try{
        const email = res.locals.user.email
        const user = await User.fetchUserByEmail(email)
        console.log('should be email: ', user)
        console.log("THIS IS USER: " , user);
        return res.status(200).json({user : user}); 
        //make a public user
    } catch(err) {
        next(err);
    }
    
} )
router.post('/login', async(req,res,next) => {
    try{
        const user = await User.login(req.body);
        const token = createUserJwt(user);
        return res.status(200).json({
            message : "Login Successful!",
            user : user, 
            token : token});
    } catch(err) {
        next(err);
    }
})
router.post('/register', async(req,res,next) => {
    console.log("In register route");
    try{
        
        //const user = await User.register({...req.body, })
        const user = await User.register(req.body);
        const token = createUserJwt(user);
        return res.status(201).json({
            message : "Registration is Successful!",
            user : user, 
            token : token});
    } catch(err) {
        next(err);
    }
})
module.exports = router;