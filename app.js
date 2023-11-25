const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const HTTPException = require('./lib/HttpException');
const formidableMiddleware = require('express-formidable');

//db setup
const mongoClient = require("@imtiazchowdhury/mongopool").default
mongoClient.url = process.env.MONGO_URL;
mongoClient.dbName = process.env.DB_NAME;

const app = express();

// app.use(()=>console.log("here"))

app.use(formidableMiddleware({multiples: true}));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  if (err.status >= 500 || !err.status) {
    console.log(err)
    return res.status(err.status || 500).json({ InternalServerError: "Sorry something went wrong!" })
  } else if (err instanceof HTTPException || err.errorList) {
    return res.status(err.status).json(err.errorList)
  } else {
    return res.status(err.status).json({ error: err.message })
  }

});



module.exports = app;
