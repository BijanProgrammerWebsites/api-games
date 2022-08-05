const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

const {GENRES} = require('../data/genres');
const {PLATFORMS} = require('../data/platforms');
const {Sort} = require('../enums/sort');
const FIELDS =
    'fields status,id,cover,first_release_date,genres,name,platforms,total_rating,total_rating_count,release_dates,screenshots,storyline,summary';

const proxyAgent = new HttpsProxyAgent(process.env.PROXY_SERVER_URL);

function generateInit(body) {
    return {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Client-ID': process.env.IGDB_CLIENT_ID,
            Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        },
        agent: proxyAgent,
        body,
    };
}

async function convertIgdbGameToMyGame(igdbGame) {
    const covers = await convertIgdbImagesToMyImages([igdbGame], true);
    const screenshots = await convertIgdbImagesToMyImages([igdbGame], false);

    return {
        id: igdbGame.id,
        cover: covers[igdbGame.id],
        releaseDate: igdbGame.first_release_date * 1000,
        genres: convertIgdbGenresToMyGenres(igdbGame.genres),
        name: igdbGame.name,
        platforms: convertIgdbPlatformsToMyPlatforms(igdbGame.platforms),
        rating: Math.round(igdbGame.total_rating),
        ratingCount: igdbGame.total_rating_count,
        screenshots: screenshots[igdbGame.id],
        storyline: igdbGame.storyline,
        summary: igdbGame.summary,
    };
}

async function convertIgdbGamesToMyGames(igdbGames) {
    const covers = await convertIgdbImagesToMyImages(igdbGames, true);

    return igdbGames.map((igdbGame) => ({
        id: igdbGame.id,
        cover: covers[igdbGame.id],
        releaseDate: igdbGame.first_release_date * 1000,
        genres: convertIgdbGenresToMyGenres(igdbGame.genres),
        name: igdbGame.name,
        platforms: convertIgdbPlatformsToMyPlatforms(igdbGame.platforms),
        rating: Math.round(igdbGame.total_rating),
        ratingCount: igdbGame.total_rating_count,
        summary: igdbGame.summary,
        status: igdbGame.status,
    }));
}

function convertIgdbGenresToMyGenres(igdbGameGenres) {
    if (!igdbGameGenres) return [];
    return igdbGameGenres.map((id) => GENRES[id].name);
}

function convertIgdbPlatformsToMyPlatforms(igdbGamePlatforms) {
    if (!igdbGamePlatforms) return [];
    return igdbGamePlatforms.map((id) => PLATFORMS[id].name);
}

async function convertIgdbImagesToMyImages(igdbGames, isCover) {
    const ids = igdbGames.map((x) => x.id).join(',');
    const response = await fetch(
        `https://api.igdb.com/v4/${isCover ? 'covers' : 'screenshots'}`,
        generateInit(`fields width,height,image_id,game; limit 500; sort id; where game = (${ids});`)
    );

    const data = await response.json();
    const entries = data.map((x) => [
        x.game,
        {
            id: x.image_id,
            width: x.width,
            height: x.height,
        },
    ]);

    if (isCover) return Object.fromEntries(entries);

    const images = {};
    const uniqueIds = new Set(entries.map((x) => x[0]));
    for (const id of uniqueIds) {
        images[id] = entries.filter((x) => x[0] === id).map((x) => x[1]);
    }

    return images;
}

function generateIgdbQuery(...args) {
    return args.filter(Boolean).join(';') + ';';
}

function generateSortQuery(sort) {
    switch (sort) {
        case Sort.TOP_SELLER:
            return 'sort total_rating_count desc';
        case Sort.MOST_POPULAR:
            return 'sort total_rating desc';
        case Sort.NEWEST:
            return 'sort first_release_date desc';
        case Sort.OLDEST:
            return 'sort first_release_date asc';
        default:
            return '';
    }
}

function generateFiltersQuery(filters = {}) {
    const queryParts = ['game.total_rating != null'];

    if (filters.status === true) {
        queryParts.push('game.status = 0');
    }

    if (Array.isArray(filters.platforms) && filters.platforms.length > 0) {
        queryParts.push(`game.platforms = [${filters.platforms.join(',')}]`);
    }

    if (Array.isArray(filters.genres) && filters.genres.length > 0) {
        queryParts.push(`game.genres = [${filters.genres.join(',')}]`);
    }

    if (!isNaN(filters.minimumRating)) {
        queryParts.push(`game.total_rating >= ${filters.minimumRating}`);
    }

    if (!isNaN(filters.maximumRating)) {
        queryParts.push(`game.total_rating <= ${filters.maximumRating}`);
    }

    return `where ${queryParts.join(' & ')}`;
}

module.exports = {
    FIELDS,
    generateInit,
    convertIgdbGameToMyGame,
    convertIgdbGamesToMyGames,
    generateIgdbQuery,
    generateSortQuery,
    generateFiltersQuery,
};
