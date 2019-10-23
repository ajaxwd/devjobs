const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const router = require('./routes');

const app = express();

//habilitar handlerbars
app.engine('handlebars', 
    exphbs({
        defaultLayout: 'layout'
    })
);

app.set('view engine', 'handlebars');

//statis file
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router());

app.listen(5000);