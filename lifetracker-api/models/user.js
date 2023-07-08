const { Unauthorized, UnauthorizedError, BadRequestError } = require("../utils/errors");
const bcrypt = require('bcrypt');
const db = require('../db');
const { BCRYPT_WORK_FACTOR } = require('../config');
class User {
    static async login(credentials) {
        const requireFields = ["email", "password"]
        requireFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in the request body.`)
            }
        })
        const user = await User.fetchUserByEmail(credentials.email);
        if (user) {
            const isVaild = await bcrypt.compare(credentials.password, user.password);
            if (isVaild) {
                return user;
            }
        }
        throw new UnauthorizedError("Invaild username/password");

    }
    static async register(credentials) {
        const requireFields = ["email", "username", "first_name", "last_name", "password", "password_confirmation"];
        requireFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in the request body`)
            }
        })
        if (credentials.email.indexOf('@') <= 0) {
            throw new BadRequestError('Invaild email address must include @')
        }
        const userExistenceCheck = await User.fetchUserByEmail(credentials.username)
        if (userExistenceCheck) {
            throw new BadRequestError(`This username ${credentials.username} already exist`)
        }
        const emailExistenceCheck = await User.fetchUserByEmail(credentials.email)
        if (emailExistenceCheck) {
            throw new BadRequestError(`This email ${credentials.email} already exist`)
        }
        if (credentials.password !== credentials.password_confirmation) {
            throw new BadRequestError(`The password does not match`);
        }

        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR);
        const lowercaseEmail = credentials.email.toLowerCase();
        const result = await db.query(`
        INSERT INTO users(
            first_name,
            last_name,
            username,
            email,
            password
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING id,first_name,last_name,email, password, created_at
        `, [credentials.first_name, credentials.last_name, credentials.username, lowercaseEmail, hashedPassword])

        const user = result.rows[0];
        return user;

    }
    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError('The email is not provided');
        }
        //the $1 is a query interpulation 
        const query = `SELECT * FROM users WHERE email = $1`
        //we store the result in this variables
        const result = await db.query(query, [email.toLowerCase()])
        //then return it in rows
        const user = result.rows[0]
       
        return user;
    }

}
module.exports = User;