import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import {connect} from './database/connect.js';
connect();

import userRouter from './routers/user.js';
import docs from './docs/index.js';

const PORT = process.env.PORT || 5000;

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

export default app;
