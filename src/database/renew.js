import {connect, disconnect} from './connect.js';

import {query} from '../utils/controller-utils.js';
import fs from 'fs/promises';

const TABLE_USER_CREATE = (await fs.readFile('src/queries/table-user-create.sql')).toString();
const TABLE_USER_INSERT_BIJAN = (await fs.readFile('src/queries/table-user-insert-bijan.sql')).toString();
const TABLE_USER_INSERT_TEST = (await fs.readFile('src/queries/table-user-insert-test.sql')).toString();

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
        connect();

        await query(FAKE_RES, 'DROP DATABASE IF EXISTS codestar_games');
        await query(FAKE_RES, 'CREATE DATABASE codestar_games');
        await query(FAKE_RES, 'USE codestar_games');
        await query(FAKE_RES, TABLE_USER_CREATE);
        await query(FAKE_RES, TABLE_USER_INSERT_BIJAN);
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
