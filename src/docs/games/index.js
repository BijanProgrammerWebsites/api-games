const one = require('./one');
const genres = require('./genres');
const platforms = require('./platforms');
const gameModes = require('./game-modes');
const upcoming = require('./upcoming');
const search = require('./search');

module.exports = {
    paths: {
        '/one/{id}': {...one},
        '/genres': {...genres},
        '/platforms': {...platforms},
        '/game-modes': {...gameModes},
        '/upcoming': {...upcoming},
        '/search': {...search},
    },
};
