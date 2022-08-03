const one = require('./one');
const genres = require('./genres');
const platforms = require('./platforms');
const upcoming = require('./upcoming');
const search = require('./search');

module.exports = {
    paths: {
        '/one/{id}': {...one},
        '/genres': {...genres},
        '/platforms': {...platforms},
        '/upcoming': {...upcoming},
        '/search': {...search},
    },
};
