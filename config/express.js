const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const passport = require('./passport');
const path = require('path');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
// bodyparser setting
app.use(bodyParser.urlencoded({ extended: false }));
// session setting
app.use(session({
	secret: '!@#!@#ASDAWD!@#!@#',
	resave: false,
	saveUninitialized: true,
	store: new MySQLStore({
		host : 'localhost',
		user : 'root',
		password : '123qwe',
		database : 'sample'
	})
}));
// passport setting
app.use(passport.initialize());
app.use(passport.session());
// logger
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;