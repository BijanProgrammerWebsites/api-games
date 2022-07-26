const {ErrorMessage} = require('../enums/error-message');

const {
    createAndSendToken,
    hash,
    hashCompare,
    query,
    sendError,
    tryCatch,
    verifyToken,
    verifyTokenQuery,
} = require('../utils/controller-utils');

async function one(req, res) {
    const {id} = req.params;

    if (!id) {
        sendError(res, ErrorMessage.USER_ID_REQUIRED, 400);
        return;
    }

    await tryCatch(res, async () => {
        const users = await query(res, 'SELECT * FROM user WHERE id = ?', id, ErrorMessage.USER_NOT_FOUND);

        const user = users[0];
        delete user.password;

        res.json({user});
    });
}

async function auth(req, res) {
    try {
        const {id} = await verifyToken(req);
        res.send({id});
    } catch (err) {
        sendError(res, ErrorMessage.AUTHENTICATION_FAILED, 401);
    }
}

async function register(req, res) {
    const {username, email, firstName, lastName, password} = req.body;

    if (!username || !email || !password) {
        sendError(res, ErrorMessage.USER_ALL_CREDENTIALS_REQUIRED, 400);
        return;
    }

    const query1 = 'SELECT * FROM user WHERE username = ? OR email = ?';
    const query2 = 'INSERT INTO user (username, email, firstName, lastName, password) VALUES ?';

    await tryCatch(res, async () => {
        const rows = await query(res, query1, [username, email]);

        if (rows.length > 0) {
            sendError(res, ErrorMessage.USER_ALREADY_EXISTS, 400);
            return;
        }

        const hashed = await hash(password);
        const {insertId} = await query(res, query2, [[[username, email, firstName || '', lastName || '', hashed]]]);

        createAndSendToken(res, 201, insertId);
    });
}

async function login(req, res) {
    const {username, email, password} = req.body;

    if ((!username && !email) || !password) {
        sendError(res, ErrorMessage.USER_ALL_CREDENTIALS_REQUIRED, 400);
        return;
    }

    const query1 = `SELECT * FROM user WHERE ${username ? 'username' : 'email'} = ?`;

    await tryCatch(res, async () => {
        const rows = await query(res, query1, username ? username : email, ErrorMessage.USER_NOT_FOUND);
        const user = rows[0];

        await hashCompare(res, password, user.password);
        createAndSendToken(res, 200, user.id);
    });
}

async function alter(req, res) {
    const fields = ['username', 'email', 'firstName', 'lastName', 'password', 'avatar', 'gender', 'birthDate'];
    const validFields = fields.filter((f) => !!req.body[f]);

    if (validFields.length === 0) {
        sendError(res, ErrorMessage.USER_AT_LEAST_ONE_FIELD_REQUIRED, 400);
        return;
    }

    const query1 = 'SELECT * FROM user WHERE id = ?';
    const options = (x) => x;

    let query2 = 'UPDATE user SET';
    validFields.forEach((f) => (query2 += ` ${f} = ?,`));
    query2 = query2.slice(0, query2.length - 1);
    query2 += ' WHERE id = ?';

    if (req.body.password) req.body.password = await hash(req.body.password);
    const values = validFields.map((f) => req.body[f]);

    await tryCatch(res, async () => {
        const [, id] = await verifyTokenQuery(req, res, query1, options, ErrorMessage.USER_NOT_FOUND);
        await query(res, query2, [...values, id]);

        res.send();
    });
}

module.exports = {
    one,
    auth,
    register,
    login,
    alter,
};
