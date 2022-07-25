const express = require('express');
const swaggerUi = require('swagger-ui-express');

const {connect} = require('./database/connect');

const userRouter = require('./routers/user');
const docs = require('./docs/index');

const PORT = process.env.PORT || 5000;

const main = async () => {
    const connection = await connect();
    await connection.query(`USE ${process.env.DB_NAME}`);

    // init app
    const app = express();

    // parse middlewares
    app.use(express.json());
    app.use(express.static('public'));

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        next();
    });

    // routers
    app.get('', (req, res) => {
        res.redirect('/api-docs');
    });

    app.use('/user', userRouter);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
    app.listen(PORT, () => console.log(`listening on port ${PORT} ...`));
};

main().then(() => {
    console.log('Done!');
});
