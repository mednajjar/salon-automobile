require('dotenv').config({path:'./config/.env'})
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

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));




mongoose.set('useCreateIndex', true);
// mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);

Fawn.init(mongoose);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.DB_CON, { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('Database connected :)'))
.catch(()=>console.log('Faild to connect with database :('))

app.use('/api', homeRoute);
app.use('/api', ownerRoute);
app.use('/api', clientRoute);
app.use('/api', authentication);

app.listen(port, ()=>console.log(`http://localhost:${port}`))