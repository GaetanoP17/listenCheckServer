var express = require('express');
var cors = require('cors');
var multer = require('multer');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var find_remove = require('find-remove');

var index = require('./routes/index');
var update_suono = require('./routes/update_suono');
var menupaziente = require('./routes/menupaziente');
var login = require('./routes/login');
var insert_suono = require('./routes/insert_suono');
var upload_image = require('./routes/upload_image');
var upload_sound = require('./routes/upload_sound');
var insert_datimedia = require('./routes/insert_datimedia');
var menucommunity = require('./routes/menucommunity');
var categorie = require('./routes/categorie');
var registrazioneUtente= require('./routes/registrazioneUtente');
var recuperaPassword = require ('./routes/recuperaPassword');
var profiloUtente = require('./routes/profiloUtente');
var registrazioneLogopedista = require('./routes/registrazioneLogopedista');
var cercaLogopedista = require('./routes/cercaLogopedista');
var gestioneCollaborazioni = require('./routes/gestioneCollaborazioni');
var connectionDB= require('./routes/connessioneDB');
var mailer= require('./routes/mailer');
var esercitazione = require('./routes/esercitazione');
var apprendimento = require('./routes/apprendimento');
var progressiPaziente = require('./routes/progressiPaziente');
var profiloLogopedista = require('./routes/profiloLogopedista');
var delete_all = require('./routes/delete_all');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {

    // Website you wish to allow to connect

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use('/', index);
app.use('/login', login);
app.use('/upload_image', upload_image);
app.use('/insert_datimedia', insert_datimedia);
app.use('/upload_sound', upload_sound);
app.use('/menucommunity', menucommunity);
app.use('/categorie', categorie);
app.use('/insert_suono', insert_suono);
app.use('/update_suono', update_suono);
app.use('/registrazioneUtente',registrazioneUtente);
app.use('/recuperaPassword',recuperaPassword);
app.use('/profiloUtente',profiloUtente);
app.use('/registrazioneLogopedista',registrazioneLogopedista);
app.use('/cercaLogopedista', cercaLogopedista);
app.use('/gestioneCollaborazioni', gestioneCollaborazioni);
app.use('/esercitazione', esercitazione);
app.use('/apprendimento', apprendimento);
app.use('/progressiPaziente', progressiPaziente);
app.use('/menupaziente', menupaziente);
app.use('/profiloLogopedista', profiloLogopedista);
app.use('/delete_all', delete_all);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
