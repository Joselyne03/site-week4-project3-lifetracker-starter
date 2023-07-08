require ("dotenv").config()

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const SECRET_KEY = process.env.SECRET_KEY ;

function getDatabaseUri(){
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || "lifetracker"
    return `postgres://postgres_lifetracker_user:LNHkwXhZgxryKrxAohXzTJ6JdjETJlFg@dpg-cikes615rnuvtgvbngeg-a/postgres_lifetracker`
    //postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}
    // the format is usually: 
    //postgresql://<username>:<password>@<hostname>:<port>/<database-name> 
}

const BCRYPT_WORK_FACTOR = 13;

console.log("lifetracker Config:");
console.log("PORT:", PORT);
console.log("The database URL: ", getDatabaseUri());
console.log("-------");

module.exports = {
    PORT,
    getDatabaseUri,
    BCRYPT_WORK_FACTOR,
    SECRET_KEY
}