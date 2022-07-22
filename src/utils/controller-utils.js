import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {ErrorMessage} from '../enums/error-message.js';
import {getPool} from '../database/connect.js';

export const createAndSendToken = (res, status, id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET);
    res.status(status).send({id, token});
};

export const hash = (word) => {
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

export const hashCompare = (res, word, hashed) => {
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

export const query = async (res, queryString, queryOptions, notFound, errorHandler) => {
    return new Promise((resolve, reject) => {
        getPool().getConnection((err, connection) => {
            if (err) {
                sendError(res, ErrorMessage.DATABASE, 500);
                return reject();
            }

            connection.query(queryString, queryOptions, (err, rows) => {
                connection.release();

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
    });
};

export const sendError = (res, message, status, error = 'N/A') => {
    res.status(status).send({message, error});
};

export const tryCatch = async (res, callback) => {
    try {
        await callback();
    } catch (err) {
        if (!res.headersSent) sendError(res, ErrorMessage.SOMETHING_WENT_WRONG, 500, err);
    }
};

export const verifyToken = (req) => {
    return new Promise((resolve, reject) => {
        const {token} = req.body;

        if (!token) return reject();

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) reject(err);
            else resolve(decodedToken);
        });
    });
};

export const verifyTokenQuery = async (req, res, queryString, queryOptions, notFound, errorHandler) => {
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
