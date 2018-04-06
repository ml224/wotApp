'use strict';
let express = require('express');

let resourcesRoutes = require('./routes/api/resources'),
    apiHomeRoutes = require('./routes/api/home'),
    errorHandler = require('./routes/error'),
    appRoute = require('./routes/client/app'),
    clientApiRoute = require('./routes/client/api'),
    resources = require('./resources/model').resources,
    utils = require('./utils/utils');

let bodyParser = require('body-parser'),
    path = require('path'),
    exphbs = require('express-handlebars');

require('dotenv').config();

let app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.use('/', apiHomeRoutes);
app.use('/app', appRoute);
app.use('/api', clientApiRoute);
app.use('/pi/resources', resourcesRoutes);

errorHandler(app);

let server = app.listen(resources.pi.port, function () {
    console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});
let io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('connected to socket.io!');
    utils.connectMqtt(socket);
});

/*
 //cors = require('cors'),
app.use(cors({
    "origin": "*",
    "methods": "GET",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));

*/