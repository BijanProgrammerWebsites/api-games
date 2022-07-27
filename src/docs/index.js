const components = require('./components');
const user = require('./user/index');

module.exports = {
    openapi: '3.0.3',
    servers: [{url: process.env.BASE_HREF || '/'}],
    info: {
        title: 'CodeStar Games',
    },
    ...components,
    paths: {
        ...user.paths,
    },
};
