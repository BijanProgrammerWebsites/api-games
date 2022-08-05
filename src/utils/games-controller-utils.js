const HttpsProxyAgent = require('https-proxy-agent');

const {Sort} = require('../enums/sort');

const GAME_FIELDS = [
    'id',
    'age_ratings.category',
    'age_ratings.rating',
    'cover.height',
    'cover.image_id',
    'cover.width',
    'first_release_date',
    'game_modes.name',
    'genres.name',
    'involved_companies.company.country',
    'involved_companies.company.description',
    'involved_companies.company.logo.height',
    'involved_companies.company.logo.image_id',
    'involved_companies.company.logo.width',
    'involved_companies.company.name',
    'involved_companies.company.url',
    'involved_companies.company.websites.category',
    'involved_companies.company.websites.trusted',
    'involved_companies.company.websites.url',
    'involved_companies.developer',
    'involved_companies.porting',
    'involved_companies.publisher',
    'involved_companies.supporting',
    'keywords.name',
    'name',
    'platforms.name',
    'player_perspectives.name',
    'release_dates',
    'screenshots.height',
    'screenshots.image_id',
    'screenshots.width',
    'storyline',
    'summary',
    'themes.name',
    'total_rating',
    'total_rating_count',
    'videos.video_id',
    'videos.name',
    'websites.category',
    'websites.trusted',
    'websites.url',
];

const GAME_FIELDS_QUERY = `fields ${GAME_FIELDS.join(',')}`;
const RELEASE_DATES_FIELDS_QUERY = `fields ${GAME_FIELDS.map((x) => `game.${x}`).join(',')}`;
const ITEMS_FIELDS_QUERY = 'fields name';

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

function convertIgdbGamesToMyGames(games) {
    return games.map((game) => ({
        id: game.id,
        ageRatings: game.age_ratings,
        cover: convertIgdbImagesToMyImages([game.cover]),
        gameModes: game.game_modes,
        genres: game.genres,
        involvedCompanies: game.involved_companies,
        keywords: game.keywords,
        name: game.name,
        platforms: game.platforms,
        playerPerspectives: game.player_perspectives,
        rating: Math.round(game.total_rating),
        ratingCount: game.total_rating_count,
        releaseDate: game.first_release_date * 1000,
        screenshots: convertIgdbImagesToMyImages(game.screenshots),
        storyline: game.storyline,
        summary: game.summary,
        themes: game.themes,
        videos: convertIgdbVideosToMyVideos(game.videos),
        websites: game.websites,
    }));
}

function convertIgdbImagesToMyImages(images) {
    return images.map((image) => ({
        id: image.image_id,
        width: image.width,
        height: image.height,
    }));
}

function convertIgdbVideosToMyVideos(videos) {
    return videos.map((video) => ({
        id: video.video_id,
        name: video.name,
    }));
}

function combineIgdbQueries(...args) {
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

    if (Array.isArray(filters.genres) && filters.genres.length > 0) {
        queryParts.push(`game.genres = [${filters.genres.join(',')}]`);
    }

    if (Array.isArray(filters.platforms) && filters.platforms.length > 0) {
        queryParts.push(`game.platforms = [${filters.platforms.join(',')}]`);
    }

    if (Array.isArray(filters.gameModes) && filters.gameModes.length > 0) {
        queryParts.push(`game.game_modes = [${filters.gameModes.join(',')}]`);
    }

    if (Array.isArray(filters.keywords) && filters.keywords.length > 0) {
        queryParts.push(`game.keywords = [${filters.keywords.join(',')}]`);
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
    GAME_FIELDS_QUERY,
    RELEASE_DATES_FIELDS_QUERY,
    ITEMS_FIELDS_QUERY,
    generateInit,
    convertIgdbGamesToMyGames,
    combineIgdbQueries,
    generateSortQuery,
    generateFiltersQuery,
};
