import dotenv from "dotenv"

dotenv.config();

export default {
    development: {
        database: process.env.DB_DATABASENAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    },
};