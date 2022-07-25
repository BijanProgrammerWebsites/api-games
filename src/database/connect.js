const mysql = require('mysql');

const {config} = require('dotenv');
config();

let connection;
let pool;

const connect = async () => {
    return new Promise((resolve, reject) => {
        connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        });

        connection.connect((err) => {
            if (err) return reject(err);
            console.log(`connected to mysql as ${connection.threadId}`);

            resolve(connection);
        });
    });
};

const getConnection = () => {
    return connection;
};

const disconnect = () => {
    if (connection) connection.end();
    if (pool) pool.end();
};

module.exports = {
    connect,
    getConnection,
    disconnect,
};
