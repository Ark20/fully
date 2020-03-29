'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
var routes = require("./routes")
var cors = require(`cors`);
const jsonParser = require('body-parser').json
var bodyParser = require('body-parser')


// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// setup morgan which gives us http request logging
app.use(morgan("dev"));
app.use(jsonParser());
app.use(cors());

// setup a friendly greeting for the root route
app.use("/api",routes)

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500);
  res.json({

    error: {
      message: err.message
    }

  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
