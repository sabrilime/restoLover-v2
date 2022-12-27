import express from 'express';
import {readdirSync} from 'fs';
import cors from 'cors';

require('dotenv').config();

const morgan = require('morgan');
const helmet = require('helmet');
const connect = require('./src/config/db.config');
const app = express();

//DB Connection
connect();

//midllewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());

// route middleware
readdirSync('./src/routes').map(
    (r) => app.use('/api', require(`./src/routes/${r}`))
);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));