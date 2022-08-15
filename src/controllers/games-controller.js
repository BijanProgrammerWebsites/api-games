const fetch = require('node-fetch');

const {ErrorMessage} = require('../enums/error-message');
const {sendError, tryCatch} = require('../utils/controller-utils');
const {
    GAME_FIELDS_QUERY,
    ITEMS_FIELDS_QUERY,
    generateInit,
    convertIgdbGamesToMyGames,
    combineIgdbQueries,
    generateSortQuery,
    generateFiltersQuery,
} = require('../utils/games-controller-utils');

const {
    IGDB_API_GAMES,
    IGDB_API_GENRES,
    IGDB_API_PLATFORMS,
    IGDB_API_GAME_MODES,
    IGDB_API_PLAYER_PERSPECTIVES,
    IGDB_API_THEMES,
    IGDB_API_SEARCH,
} = require('../utils/api-utils');
const {BANNERS} = require('../data/banners');

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

        const games = convertIgdbGamesToMyGames(data);
        res.json({game: games[0]});
    });
}

async function genres(req, res) {
    await items(req, res, IGDB_API_GENRES);
}

async function platforms(req, res) {
    await items(req, res, IGDB_API_PLATFORMS);
}

async function gameModes(req, res) {
    await items(req, res, IGDB_API_GAME_MODES);
}

async function playerPerspectives(req, res) {
    await items(req, res, IGDB_API_PLAYER_PERSPECTIVES);
}

async function themes(req, res) {
    await items(req, res, IGDB_API_THEMES);
}

async function items(req, res, api) {
    await tryCatch(res, async () => {
        const query = `${ITEMS_FIELDS_QUERY}; sort id asc; limit 500;`;
        const response = await fetch(api, generateInit(query));
        const data = await response.json();

        res.json(data);
    });
}

async function upcoming(req, res) {
    await tryCatch(res, async () => {
        const minimumDate = Math.floor(new Date() / 1000) - 30 * 24 * 3600;
        const query = `${GAME_FIELDS_QUERY}; where first_release_date >= ${minimumDate} & total_rating != null; sort first_release_date asc; limit 20;`;
        const response = await fetch(IGDB_API_GAMES, generateInit(query));
        const data = await response.json();

        res.json({games: convertIgdbGamesToMyGames(data)});
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
            sendError(res, ErrorMessage.IGDB, 500, JSON.stringify(searchData));
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
            sendError(res, ErrorMessage.IGDB, 500, JSON.stringify(gamesData));
            return;
        }

        res.json({count: gameIds.length, games: await convertIgdbGamesToMyGames(gamesData)});
    });
}

async function banners(req, res) {
    res.json(BANNERS);
}

module.exports = {
    one,
    genres,
    platforms,
    gameModes,
    playerPerspectives,
    themes,
    upcoming,
    search,
    banners,
};
