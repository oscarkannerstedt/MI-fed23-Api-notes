var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
// const connection = require('./lib/conn.js');

var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users.js');
const documentsRouter = require('./routes/documents.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/documents', documentsRouter);

module.exports = app;
