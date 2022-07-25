const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const {connect} = require('./database/connect');

const userRouter = require('./routers/user');
const docs = require('./docs/index');

const PORT = process.env.PORT || 5000;

const main = async () => {
    await connect();

    // init app
    const app = express();

    // parse middlewares
    app.use(express.json());
    app.use(express.static('public'));
    app.use(cors());

    // routers
    app.get('', (req, res) => {
        res.send('Hello, friend!');
    });

    app.use('/user', userRouter);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
    app.listen(PORT, () => console.log(`listening on port ${PORT} ...`));
};

main().then(() => {
    console.log('Done!');
});
