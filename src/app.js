const express = require('express');
const swaggerUi = require('swagger-ui-express');

const {connect} = require('./database/connect');

const userRouter = require('./routers/user');
const listRouter = require('./routers/list');
const gamesRouter = require('./routers/games');
const docs = require('./docs/index');

const PORT = process.env.PORT || 5000;

const SWAGGER_OPTIONS = {
    customSiteTitle: 'CodeStar Games',
    customfavIcon: (process.env.BASE_HREF + '/' || '/') + 'favicon.ico?v=1',
    customCss: '.swagger-ui .topbar { display: none }',
};

const main = async () => {
    const connection = await connect();
    await connection.query(`USE ${process.env.DB_NAME}`);

    // init
    const app = express();
    const router = express.Router();

    // parse middlewares
    router.use(express.json({limit: '5mb'}));
    router.use(express.static('public'));

    // cors
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');
        next();
    });

    // routes
    router.use('/user', userRouter);

    ['wishlist', 'favorites', 'library'].forEach((x) => {
        router.use(
            `/${x}`,
            (req, res, next) => {
                req.list = x;
                next();
            },
            listRouter
        );
    });

    router.use('/', gamesRouter);
    router.use('/', swaggerUi.serve, swaggerUi.setup(docs, SWAGGER_OPTIONS));

    // base href
    app.use(process.env.BASE_HREF || '/', router);

    // start
    app.listen(PORT, () => console.log(`listening on port ${PORT} ...`));
};

main().then(() => {
    console.log('Done!');
});
