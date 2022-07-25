const {connect, disconnect} = require('./connect');

const {query} = require('../utils/controller-utils');
const fs = require('fs/promises');

const FAKE_RES = {
    status: (code) => {
        console.log('code ', code);

        return {
            send: (message) => {
                console.log('message ', message);
            },
        };
    },
};

const main = async () => {
    try {
        const TABLE_USER_CREATE = (await fs.readFile('src/queries/table-user-create.sql')).toString();
        const TABLE_USER_INSERT_BIJAN = (await fs.readFile('src/queries/table-user-insert-bijan.sql')).toString();
        const TABLE_USER_INSERT_TEST = (await fs.readFile('src/queries/table-user-insert-test.sql')).toString();

        const connection = await connect();

        console.log('dropping database if exists ...');
        await connection.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
        console.log('creating database ...');
        await connection.query(`CREATE DATABASE ${process.env.DB_NAME}`);
        console.log('using database ...');
        await connection.query(`USE ${process.env.DB_NAME}`);

        console.log('creating user table ...');
        await query(FAKE_RES, TABLE_USER_CREATE);
        console.log('inserting bijan ...');
        await query(FAKE_RES, TABLE_USER_INSERT_BIJAN);
        console.log('inserting test ...');
        await query(FAKE_RES, TABLE_USER_INSERT_TEST);
    } catch (err) {
        console.log(err);
    } finally {
        disconnect();
    }
};

main().then(() => {
    console.log('Done!');
});
