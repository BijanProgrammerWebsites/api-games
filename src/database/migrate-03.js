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
        const TABLE_LIBRARY_CREATE = (await fs.readFile('src/queries/table-library-create.sql')).toString();

        const connection = await connect();

        console.log('using database ...');
        await connection.query(`USE ${process.env.DB_NAME}`);

        console.log('creating library table ...');
        await query(FAKE_RES, TABLE_LIBRARY_CREATE);
    } catch (err) {
        console.log(err);
    } finally {
        disconnect();
    }
};

main().then(() => {
    console.log('Done!');
});
