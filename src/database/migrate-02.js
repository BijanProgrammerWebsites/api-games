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
        const TABLE_USER_ALTER_COLUMN_CREDIT = (
            await fs.readFile('src/queries/table-user-alter-column-credit.sql')
        ).toString();

        const connection = await connect();

        console.log('using database ...');
        await connection.query(`USE ${process.env.DB_NAME}`);

        console.log('altering user table ...');
        await query(FAKE_RES, TABLE_USER_ALTER_COLUMN_CREDIT);
    } catch (err) {
        console.log(err);
    } finally {
        disconnect();
    }
};

main().then(() => {
    console.log('Done!');
});
