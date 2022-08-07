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
        const TABLE_WISHLIST_CREATE = (await fs.readFile('src/queries/table-wishlist-create.sql')).toString();
        const TABLE_FAVORITES_CREATE = (await fs.readFile('src/queries/table-favorites-create.sql')).toString();

        const connection = await connect();

        console.log('using database ...');
        await connection.query(`USE ${process.env.DB_NAME}`);

        console.log('creating wishlist table ...');
        await query(FAKE_RES, TABLE_WISHLIST_CREATE);

        console.log('creating favorites table ...');
        await query(FAKE_RES, TABLE_FAVORITES_CREATE);
    } catch (err) {
        console.log(err);
    } finally {
        disconnect();
    }
};

main().then(() => {
    console.log('Done!');
});
