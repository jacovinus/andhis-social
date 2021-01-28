
/** Andhis Nodejs server */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

const user_routes = require('./routes/user');
const publication_routes = require('./routes/publication');
const message_routes = require('./routes/message');
const follow_routes = require('./routes/follow');
const hotlist_routes = require('./routes/hotlist');
const like_routes = require('./routes/like');

app.use(bodyParser.urlencoded({encoded: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



app.use('/api', user_routes);
app.use('/api', publication_routes);
app.use('/api', message_routes);
app.use('/api', follow_routes);
app.use('/api', hotlist_routes);
app.use('/api', like_routes);

module.exports = app;