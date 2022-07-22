import one from './one.js';
import auth from './auth.js';
import register from './register.js';
import login from './login.js';
import alter from './alter.js';

export default {
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
