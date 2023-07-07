const db = require('../db');
const {BadRequestError,NotFoundError} =require("../utils/errors")

class Nutrition {
    //"name"`, `"category"`, `"calories"`, and `"image_url"`. The `quantity` field should default to `1`.
    static async createNutrition ({nutrition}){

         //console.log("user", user)
        // console.log("nutrientation",nutrition)
        const requiredFields = ["name", "category", "calories", "image_url", "quantity","user_id"]
        //quanitity
        requiredFields.forEach(field => {
            if(!nutrition.hasOwnProperty(field)){
                throw new BadRequestError(`Required field ${field} is missing`)
            }
        })
        const results = await db.query(
            `
            INSERT INTO nutrition (name, category,calories,image_url, quantity,user_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING 
                    id, 
                    name AS "name",
                    category AS "catgory",
                    calories AS "calories",
                    image_url AS "image_url",
                    user_id AS "user_id",
                    quantity,
                    created_at
            `, [nutrition.name, nutrition.category, nutrition.calories, nutrition.image_url, nutrition.quantity, nutrition.user_id]
        )
        return results.rows[0];

    }
    static async fetchNutritionById (nutritionId){
        const results = await db.query(
            `
            SELECT n.id,
                   n.name,
                   u.email AS "email",
                   n.category,
                   n.calories,
                   n.image_url AS "image_url",
                   n.user_id AS "user_id",
                   n.quantity,
                   n.created_at AS "created_at"
            FROM nutrition AS n
            JOIN users AS u ON u.id::text= n.user_id::text
            WHERE n.id = $1
            `,[nutritionId]
        );
        const nutrition =  results.rows[0];
        if (!nutrition){
            throw new NotFoundError()
        }
        return nutrition;
    }
    static async listNutritionForUser(user_id){
       //here we will fetch the list of nutrition from a user
       //user is determined by an id sent in the top
       //then we query all rows that share the same user_id
       console.log(user_id)
        const query = `SELECT * FROM nutrition WHERE user_id = $1`
        const results = await db.query(query, [user_id])
        return results.rows;
    }

}
module.exports = Nutrition;
// `
// SELECT n.id,
// n.name,
// u.email AS "email",
// n.category,
// n.calories,
// n.image_url AS "image_url",
// n.user_id AS "user_id",
// n.quantity,
// n.created_at AS "created_at"
// FROM nutrition AS n
// JOIN users AS u ON u.id::text= n.user_id::text
// ORDER BY n.created_at DESC
// `