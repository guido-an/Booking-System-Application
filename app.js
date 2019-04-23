require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);


var flash = require('connect-flash');



mongoose
  .connect('mongodb://localhost/bookyourtable', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// start session
app.use(session({
  secret: process.env.SESSIONSECRET,
  cookie: { maxAge: 86400000 }, // one day 
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 
  }),
  resave: true,
  saveUninitialized: true
}));




// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use('/private', express.static(path.join(__dirname, 'admin')));  // specify a different folder for your private statics on a separate route

app.all('/admin/*', function(req, res, next) { // then you can use your middleware on each request
  if (req.session.currentUser) {
    next(); // allow the next route to run
  } else {
  
    // require the user to log in
    res.redirect("/auth/login"); 
  }
})






// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth');
app.use('/auth', auth)

const admin = require('./routes/admin');   // private routes
app.use('/admin', admin)










module.exports = app;
