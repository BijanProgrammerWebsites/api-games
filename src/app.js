const express = require('express');
const swaggerUi = require('swagger-ui-express');

const {connect} = require('./database/connect');

const userRouter = require('./routers/user');
const docs = require('./docs/index');

const PORT = process.env.PORT || 5000;

const main = async () => {
    const connection = await connect();
    await connection.query(`USE ${process.env.DB_NAME}`);

    // init
    const app = express();
    const router = express.Router();

    // parse middlewares
    router.use(express.json());
    router.use(express.static('public'));

    // cors
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        next();
    });

    // routes
    router.use('/user', userRouter);
    router.use('/', swaggerUi.serve, swaggerUi.setup(docs));

    // base href
    app.use(process.env.BASE_HREF || '/', router);

    // start
    app.listen(PORT, () => console.log(`listening on port ${PORT} ...`));
};

main().then(() => {
    console.log('Done!');
});
