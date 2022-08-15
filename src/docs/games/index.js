const one = require('./one');
const genres = require('./genres');
const platforms = require('./platforms');
const gameModes = require('./game-modes');
const playerPerspectives = require('./player-perspectives');
const themes = require('./themes');
const upcoming = require('./upcoming');
const search = require('./search');
const banners = require('./banners');

module.exports = {
    paths: {
        '/one/{id}': {...one},
        '/genres': {...genres},
        '/platforms': {...platforms},
        '/game-modes': {...gameModes},
        '/player-perspectives': {...playerPerspectives},
        '/themes': {...themes},
        '/upcoming': {...upcoming},
        '/search': {...search},
        '/banners': {...banners},
    },
};
