/**
 * File : config/database.js
 * Description: Responsible for creating the connection pool
 *  to PostgreSQL database
 */

////export statement for commonjs based build or non-module based build
//const { Pool } = require('pg');
//const dotenv = require('dotenv');

import { Pool } from "pg"
import { Client } from "pg"
import dotenv from "dotenv"
import * as database from "mime-db";

dotenv.config();

// Connection Pool to Database
/** 
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
   
});
*/

const pool =
    new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'EuroJobs',
        password: 'Masaraswati1!',
        port: '5432',
        max: 20, // Maximum number of clients in the pool 
        idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed 
    }); 

console.log('database.js : Success with loading environment variables for database connection');


 
const client = new Client({ user: 'postgres', host: 'localhost', database: 'EuroJobs', password: 'Masaraswati1!', port: '5432', });

client.connect().then(() => { console.log('database.js : Connected to PostgreSQL database!'); }).catch((err) => {
    console.error('Error connecting to the database:', err);
});

pool.on('connect', () => {
    console.log('database.js : Success with Database Connection Using Pool');
});

/*
module.exports = {
    query: (text, params) => pool.query(text, params),
};
*/
export default {
    query: (text, params) => pool.query(text, params),
}