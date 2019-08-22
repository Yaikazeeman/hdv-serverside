require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');


app.use(cors({
    origin: true,
    credentials: true
}))

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then((x) => {
        console.log(`database name: ${x.connections[0].name}`);
    }).catch(err => {
        console.log('error', err);
    });

//setting the session cookie
app.use(session({
    secret: "basic-auth-secret",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        ttl: 24 * 60 * 60,
        url: process.env.MONGODB_URI
    })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function(req, res, next) {
    if (req.session.user) res.locals.user = req.session.user;
    // console.log(res.locals.user)
    next();
})

app.use('/', require('./routes/index'));
const login = require('./routes/login')
app.use('/', login);
const logout = require('./routes/login')
app.use('/', logout);
const signup = require('./routes/signup')
app.use('/', signup);
const newOrder = require('./routes/newOrder')
app.use('/', newOrder);
const orders = require('./routes/orders')
app.use('/', orders);
const admin = require('./routes/admin')
app.use('/', admin);
const edit = require('./routes/edit')
app.use('/', edit);
// const delete = require('./routes/delete')
app.use('/', require('./routes/delete'));

app.listen(process.env.PORT, () => { console.log(`app listening on port ${process.env.PORT}`) })
