const components = require('./components');
const user = require('./user/index');
const games = require('./games/index');
const {generatePaths} = require('./list');

module.exports = {
    openapi: '3.0.3',
    servers: [{url: process.env.BASE_HREF || '/'}],
    info: {
        title: 'CodeStar Games',
    },
    ...components,
    paths: {
        ...user.paths,
        ...games.paths,
        ...generatePaths('wishlist'),
        ...generatePaths('favorites'),
        ...generatePaths('library'),
    },
};
