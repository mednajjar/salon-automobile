require('dotenv').config({ path: './config/.env' })
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const homeRoute = require('./routes/home');
const ownerRoute = require('./routes/owner');
const clientRoute = require('./routes/client');
const authentication = require('./routes/auth');
const cookieParser = require('cookie-parser');
const Fawn = require("fawn");
const path = require('path');
const port = process.env.PORT | process.env.MY_PORT
const cors = require('cors');
const { isAuth } = require('./middlewares/validToken');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
//     if (req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
//         res.setHeader('Access-Control-Allow-Credentials', true);
//         return res.status(200).json({});
//     }
//     next();
// });

mongoose.set('useCreateIndex', true);
// mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);

Fawn.init(mongoose);

app.use(`/uploads`, express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.DB_CON, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected :)'))
    .catch(() => console.log('Faild to connect with database :('))

    
    app.use('/api', homeRoute);
    app.use('/api', ownerRoute);
    app.use('/api', clientRoute);
    app.use('/api', authentication);
    // app.use('*', isAuth);
    app.use('*', isAuth, (req, res, next) => {
        next();
    });

app.listen(port, () => console.log(`http://localhost:${port}`))