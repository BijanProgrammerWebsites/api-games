const fetch = require('node-fetch');

const {ErrorMessage} = require('../enums/error-message');

const {query, sendError, tryCatch, verifyToken} = require('../utils/controller-utils');

const {
    generateInit,
    combineIgdbQueries,
    GAME_FIELDS_QUERY,
    convertIgdbGamesToMyGames,
} = require('../utils/games-controller-utils');

const {IGDB_API_GAMES} = require('../utils/api-utils');

async function all(req, res) {
    await confirmUser(req, res, async (userId) => {
        await tryCatch(res, async () => {
            const items = await query(
                res,
                `SELECT * FROM ${req.list} WHERE userId = ?`,
                userId,
                ErrorMessage.LIST_EMPTY
            );

            const gameIds = items.map((x) => x.gameId);
            const gamesQueryParts = combineIgdbQueries(
                GAME_FIELDS_QUERY,
                `where id = (${gameIds.join(',')})`,
                `limit 500`
            );
            const gamesResponse = await fetch(IGDB_API_GAMES, generateInit(gamesQueryParts));
            const gamesData = await gamesResponse.json();

            if (!gamesResponse.ok) {
                sendError(res, ErrorMessage.IGDB, 500, JSON.stringify(gamesData));
                return;
            }

            res.json({games: await convertIgdbGamesToMyGames(gamesData)});
        });
    });
}

async function add(req, res) {
    await confirmUser(req, res, async (userId) => {
        const {gameId} = req.body;

        if (!gameId) {
            sendError(res, ErrorMessage.GAME_ID_REQUIRED, 400);
            return;
        }

        const query1 = `SELECT * FROM ${req.list} WHERE userId = ? AND gameId = ?`;
        const query2 = `INSERT INTO ${req.list} (userId, gameId) VALUES ?`;

        await tryCatch(res, async () => {
            const rows = await query(res, query1, [userId, gameId]);

            if (rows.length > 0) {
                sendError(res, ErrorMessage.ITEM_ALREADY_EXISTS, 400);
                return;
            }

            await query(res, query2, [[[userId, gameId]]]);
            res.status(201).send();
        });
    });
}

async function remove(req, res) {
    await confirmUser(req, res, async (userId) => {
        const {gameId} = req.body;

        if (!gameId) {
            sendError(res, ErrorMessage.GAME_ID_REQUIRED, 400);
            return;
        }

        const query1 = `SELECT id FROM ${req.list} WHERE userId = ? AND gameId = ?`;
        const query2 = `DELETE FROM ${req.list} WHERE id = ?`;

        await tryCatch(res, async () => {
            const rows = await query(res, query1, [userId, gameId]);

            if (rows.length === 0) {
                sendError(res, ErrorMessage.ITEM_NOT_IN_LIST, 404);
                return;
            }

            await query(res, query2, [rows[0].id]);
            res.status(200).send();
        });
    });
}

async function confirmUser(req, res, callback) {
    try {
        const {id} = await verifyToken(req);
        await callback(id);
    } catch (err) {
        sendError(res, ErrorMessage.AUTHENTICATION_FAILED, 401);
    }
}

module.exports = {
    all,
    add,
    remove,
};
