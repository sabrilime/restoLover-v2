import express from 'express';
import {readdirSync} from 'fs';
import cors from 'cors';

require('dotenv').config();

const morgan = require('morgan');
const connect = require('./config/db.config');
const app = express();

//DB Connection
connect();

//midllewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// route middleware
readdirSync('./routes').map(
    (r) => app.use('/api', require(`./routes/${r}`))
);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));