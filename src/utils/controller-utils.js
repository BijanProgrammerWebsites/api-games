const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ErrorMessage} = require('../enums/error-message');
const {getConnection} = require('../database/connect');

const createAndSendToken = (res, status, id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET);
    res.status(status).send({id, token});
};

const hash = (word) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return reject(err);

            bcrypt.hash(word, salt, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
    });
};

const hashCompare = (res, word, hashed) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(word, hashed, (err, result) => {
            if (err || !result) {
                sendError(res, ErrorMessage.AUTHENTICATION_FAILED, 401);
                return reject();
            }

            resolve(result);
        });
    });
};

const query = async (res, queryString, queryOptions, notFound, errorHandler) => {
    return new Promise((resolve, reject) => {
        getConnection().query(queryString, queryOptions, (err, rows) => {
            if (err) {
                if (errorHandler) {
                    if (typeof errorHandler === 'function') errorHandler(err);
                    else sendError(res, errorHandler, 500, err);
                } else {
                    sendError(res, ErrorMessage.SOMETHING_WENT_WRONG, 500, err);
                }

                return reject();
            }

            if (notFound && (!rows || rows.length === 0)) {
                if (typeof notFound === 'function') notFound();
                else sendError(res, notFound, 404);

                return reject();
            }

            resolve(rows);
        });
    });
};

const sendError = (res, message, status, trace = 'N/A') => {
    res.status(status).send({message, trace: typeof trace === 'object' ? trace?.stack : trace});
};

const tryCatch = async (res, callback) => {
    try {
        await callback();
    } catch (err) {
        if (!res.headersSent) sendError(res, ErrorMessage.SOMETHING_WENT_WRONG, 500, err);
    }
};

const verifyToken = (req) => {
    return new Promise((resolve, reject) => {
        const {token} = req.body;

        if (!token) return reject();

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) reject(err);
            else resolve(decodedToken);
        });
    });
};

const verifyTokenQuery = async (req, res, queryString, queryOptions, notFound, errorHandler) => {
    let decodedToken;

    try {
        decodedToken = await verifyToken(req);
    } catch (err) {
        sendError(res, ErrorMessage.AUTHENTICATION_FAILED, 401);
        throw err;
    }

    const options = typeof queryOptions === 'function' ? queryOptions(decodedToken.id) : queryOptions;
    return [await query(res, queryString, options, notFound, errorHandler), decodedToken.id];
};

module.exports = {
    createAndSendToken,
    hash,
    hashCompare,
    query,
    sendError,
    tryCatch,
    verifyToken,
    verifyTokenQuery,
};
