const fetch = require('node-fetch');

const {ErrorMessage} = require('../enums/error-message');
const {sendError, tryCatch} = require('../utils/controller-utils');
const {
    generateInit,
    convertIgdbGameToMyGame,
    FIELDS,
    convertIgdbGamesToMyGames,
} = require('../utils/game-controller-utils');

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

async function search(req, res) {
    const {searchPhrase} = req.body;

    if (!searchPhrase) {
        sendError(res, ErrorMessage.SEARCH_PHRASE_NOT_VALID, 400);
        return;
    }

    await tryCatch(res, async () => {
        const response = await fetch(BASE_URL, generateInit(`${FIELDS}; search "${searchPhrase}";`));
        const data = await response.json();
        res.json({game: await convertIgdbGamesToMyGames(data)});
    });
}

module.exports = {
    one,
    search,
};
