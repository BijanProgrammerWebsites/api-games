const fetch = require('node-fetch');

const {ErrorMessage} = require('../enums/error-message');
const {sendError, tryCatch} = require('../utils/controller-utils');
const {
    generateInit,
    convertIgdbGameToMyGame,
    FIELDS,
    convertIgdbGamesToMyGames,
} = require('../utils/game-controller-utils');
const {GENRES_ARRAY} = require('../data/genres');
const {PLATFORMS_ARRAY} = require('../data/platforms');

const BASE_URL = 'https://api.igdb.com/v4/games';

async function one(req, res) {
    const {id} = req.params;

    if (!id) {
        sendError(res, ErrorMessage.GAME_ID_REQUIRED, 400);
        return;
    }

    await tryCatch(res, async () => {
        const response = await fetch(BASE_URL, generateInit(`${FIELDS}; where id = ${id};`));
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
        const response = await fetch(BASE_URL, generateInit(`${FIELDS}; where id = (${gameIds});`));
        const data = await response.json();
        res.json({games: await convertIgdbGamesToMyGames(data)});
    });
}

async function search(req, res) {
    const {searchPhrase} = req.body;

    await tryCatch(res, async () => {
        const searchQuery = searchPhrase ? `search "${searchPhrase}";` : '';
        const response = await fetch(BASE_URL, generateInit(`${FIELDS}; limit 50; ${searchQuery}`));
        const data = await response.json();
        res.json({games: await convertIgdbGamesToMyGames(data)});
    });
}

module.exports = {
    one,
    genres,
    platforms,
    upcoming,
    search,
};
