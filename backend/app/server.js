require('dotenv').config({path:'./config/.env'})
const express = require('express');
const app = express();
const port = process.env.PORT | process.env.MY_PORT
const mongoose = require('mongoose');
const path = require('path');
const Fawn = require("fawn");
const homeRoute = require('./routes/home');
const ownerRoute = require('./routes/owner');
const clientRoute = require('./routes/client');
const authentication = require('./routes/auth');
const cookieParser = require('cookie-parser');
const cors = require('cors');



app.use(cors());
app.use(cookieParser());
mongoose.set('useCreateIndex', true);
// mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);
app.use(express.json({limit: '30mb', extended: true}));
app.use(express.urlencoded({limit: '30mb', extended: true}));
Fawn.init(mongoose);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.DB_CON, { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('Database connected :)'))
.catch(()=>console.log('Faild to connect with database :('))

app.use('/api', homeRoute);
app.use('/api', ownerRoute);
app.use('/api/registerClient', clientRoute);
app.use('/api', authentication)

app.listen(port, ()=>console.log(`http://localhost:${port}`))