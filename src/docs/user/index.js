const one = require('./one.js');
const auth = require('./auth.js');
const register = require('./register.js');
const login = require('./login.js');
const alter = require('./alter.js');

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
