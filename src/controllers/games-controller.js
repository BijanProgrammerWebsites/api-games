const fetch = require('node-fetch');

const {ErrorMessage} = require('../enums/error-message');
const {sendError, tryCatch} = require('../utils/controller-utils');
const {
    generateInit,
    convertIgdbGameToMyGame,
    FIELDS,
    convertIgdbGamesToMyGames,
    generateIgdbQuery,
    generateSortQuery,
} = require('../utils/game-controller-utils');
const {GENRES_ARRAY} = require('../data/genres');
const {PLATFORMS_ARRAY} = require('../data/platforms');

const IGDB_API_GAMES = 'https://api.igdb.com/v4/games';
const IGDB_API_SEARCH = 'https://api.igdb.com/v4/search';

async function one(req, res) {
    const {id} = req.params;

    if (!id) {
        sendError(res, ErrorMessage.GAME_ID_REQUIRED, 400);
        return;
    }

    await tryCatch(res, async () => {
        const response = await fetch(IGDB_API_GAMES, generateInit(`${FIELDS}; where id = ${id};`));
        const data = await response.json();
        res.json({game: await convertIgdbGameToMyGame(data[0])});
    });
}

async function genres(req, res) {
    res.json(GENRES_ARRAY);
}

async function platforms(req, res) {
    res.json(PLATFORMS_ARRAY);
}

async function upcoming(req, res) {
    await tryCatch(res, async () => {
        const now = Math.floor(new Date() / 1000) - 365 * 24 * 3600;

        const releaseDatesResponse = await fetch(
            'https://api.igdb.com/v4/release_dates/',
            generateInit(`fields game; where date > ${now}; sort date asc;`)
        );
        const gameIds = (await releaseDatesResponse.json()).map((x) => x.game).join(',');
        const response = await fetch(IGDB_API_GAMES, generateInit(`${FIELDS}; where id = (${gameIds});`));
        const data = await response.json();
        res.json({games: await convertIgdbGamesToMyGames(data)});
    });
}

async function search(req, res) {
    const {searchPhrase, pageSize, offset, sort} = req.body;

    await tryCatch(res, async () => {
        const searchQueryParts = generateIgdbQuery(
            'fields game',
            searchPhrase ? `search "${searchPhrase}"` : '',
            'limit 500'
        );

        const searchResponse = await fetch(IGDB_API_SEARCH, generateInit(searchQueryParts));
        const searchData = await searchResponse.json();

        if (!searchResponse.ok) {
            sendError(res, ErrorMessage.IGDB, 500, JSON.stringify(searchData, null, 4));
            return;
        }

        const gameIds = searchData.map((x) => x.game).filter(Boolean);
        if (gameIds.length === 0) {
            sendError(res, ErrorMessage.GAME_NOT_FOUND, 404);
            return;
        }

        const gamesQueryParts = generateIgdbQuery(
            FIELDS,
            `where id = (${gameIds.join(',')}) & rating != null`,
            `limit ${pageSize || 20}`,
            offset ? `offset ${offset}` : '',
            generateSortQuery(sort)
        );

        const gamesResponse = await fetch(IGDB_API_GAMES, generateInit(gamesQueryParts));
        const gamesData = await gamesResponse.json();

        if (!gamesResponse.ok) {
            sendError(res, ErrorMessage.IGDB, 500, JSON.stringify(gamesData, null, 4));
            return;
        }

        res.json({games: await convertIgdbGamesToMyGames(gamesData)});
    });
}

module.exports = {
    one,
    genres,
    platforms,
    upcoming,
    search,
};
