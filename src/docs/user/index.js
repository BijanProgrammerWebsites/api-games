const one = require('./one');
const auth = require('./auth');
const register = require('./register');
const login = require('./login');
const alter = require('./alter');

module.exports = {
    paths: {
        '/user/one/{id}': {
            ...one,
        },
        '/user/auth': {
            ...auth,
        },
        '/user/register': {
            ...register,
        },
        '/user/login': {
            ...login,
        },
        '/user/alter': {
            ...alter,
        },
    },
};
