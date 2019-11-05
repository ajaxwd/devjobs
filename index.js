const mongoose = require('mongoose');
require('./config/db');

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const creareError = require('http-errors');
const passport = require('./config/passport');

require('dotenv').config({path : 'variables.env'});

const app = express();

//habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// validación de campos
app.use(expressValidator());

//habilitar handlerbars
app.engine('handlebars', 
    exphbs({
        defaultLayout: 'layout',
        helpers: require('./helpers/handlebars')
    })
);

app.set('view engine', 'handlebars');

//statis file
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection : mongoose.connection })
}));

// iniciar passport
app.use(passport.initialize());
app.use(passport.session());

// Alertas y flash messages
app.use(flash());

// Crear nuestro middleware
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    next();
});

app.use('/', router());

// 404 pagina no existente
app.use((req, res, next) => {
    next(createError(404, 'No encontrado'))
})

//Administracion de errores
app.use((error, req, res) => {
    res.locals.mensajes = error.menssage;
    const status = error.status || 500;
    res.locals.mensajes = status;
    res.status(status);
    res.render('error');
})

app.listen(process.env.PUERTO);