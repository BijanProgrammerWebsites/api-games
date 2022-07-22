import mysql from 'mysql';

import {config} from 'dotenv';
config();

let connection;
let pool;

export const connect = () => {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
    });

    connection.connect((err) => {
        if (err) throw err;
        console.log(`connected to mysql as ${connection.threadId}`);
    });
};

export const getPool = () => {
    if (!pool) {
        pool = mysql.createPool({
            connectionLimit: 100,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });
    }

    return pool;
};

export const disconnect = () => {
    if (connection) connection.end();
    if (pool) pool.end();
};
