const one = require('./one');
const search = require('./search');

module.exports = {
    paths: {
        '/one/{id}': {
            ...one,
        },
        '/search': {
            ...search,
        },
    },
};
