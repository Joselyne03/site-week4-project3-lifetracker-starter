const Nutrition = require('../models/nutrition')
const express = require('express')
const {createUserJwt} = require('../utils/token');
const security = require('../middleware/security')
const router = express.Router();

router.get('/:id', async (req,res,next) => {
    //list all post 
    try{
        const id = req.params.id
        //const id = res.locals.user.id
        console.log('should be nutr: ', id)
        const nutrition = await Nutrition.listNutritionForUser(id);
        return res.status(200).json({nutrition})
    } catch(err) {
        next(err);
    }
    
} )
router.post('/',async(req,res,next) => {
    //create a new nutrition
    try{
     //console.log(res.locals.user);
       //const {user} = res.body;
    //res.locals.user.email
      
      const nutrition = await Nutrition.createNutrition({nutrition: req.body})
      return res.status(201).json({
        message : "Nutrtrion created!",
        nutrition : nutrition});
    } catch(err) {
        next(err);
    }
})
router.get('/:nutritionId', async(req,res,next) => {
    //fetch a psot by id
    try{
       const {nutritionId} = req.params;
       const nutrition = await Nutrition.fetchNutritionById(nutritionId);
       return res.status(200).json({nutrition});
    } catch(err) {
        next(err);
    }
})
module.exports = router;