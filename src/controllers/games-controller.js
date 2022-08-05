const fetch = require('node-fetch');

const {ErrorMessage} = require('../enums/error-message');
const {sendError, tryCatch} = require('../utils/controller-utils');
const {
    generateInit,
    convertIgdbGamesToMyGames,
    combineIgdbQueries,
    generateSortQuery,
    generateFiltersQuery,
    GAME_FIELDS_QUERY,
    RELEASE_DATES_FIELDS_QUERY,
} = require('../utils/games-controller-utils');

const {GENRES_ARRAY} = require('../data/genres');
const {PLATFORMS_ARRAY} = require('../data/platforms');

const IGDB_API_GAMES = 'https://api.igdb.com/v4/games';
const IGDB_API_SEARCH = 'https://api.igdb.com/v4/search';
const IGDB_API_RELEASE_DATES = 'https://api.igdb.com/v4/release_dates';

async function one(req, res) {
    const {id} = req.params;

    if (!id) {
        sendError(res, ErrorMessage.GAME_ID_REQUIRED, 400);
        return;
    }

    await tryCatch(res, async () => {
        const query = `${GAME_FIELDS_QUERY}; where id = ${id};`;
        const response = await fetch(IGDB_API_GAMES, generateInit(query));
        const data = await response.json();

        const games = await convertIgdbGamesToMyGames(data);
        res.json({game: games[0]});
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
        const minimumDate = Math.floor(new Date() / 1000) - 180 * 24 * 3600;
        const query = `${RELEASE_DATES_FIELDS_QUERY}; where date >= ${minimumDate} & game.total_rating != null; sort date asc;`;
        const response = await fetch(IGDB_API_RELEASE_DATES, generateInit(query));
        const data = await response.json();

        const games = data.map((x) => x.game);
        res.json({games: await convertIgdbGamesToMyGames(games)});
    });
}

async function search(req, res) {
    const {searchPhrase, pageSize, offset, sort, filters} = req.body;

    await tryCatch(res, async () => {
        const searchQueryParts = combineIgdbQueries(
            'fields game',
            searchPhrase ? `search "${searchPhrase}"` : '',
            generateFiltersQuery(filters),
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

        const gamesQueryParts = combineIgdbQueries(
            GAME_FIELDS_QUERY,
            `where id = (${gameIds.join(',')})`,
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

        res.json({count: gameIds.length, games: await convertIgdbGamesToMyGames(gamesData)});
    });
}

module.exports = {
    one,
    genres,
    platforms,
    upcoming,
    search,
};
