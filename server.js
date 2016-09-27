'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('./models');
const userRouter = express.Router();
const pollRouter = express.Router();
const loginRouter = express.Router();
const CONFIG = require('./config/enviornment');
let port = process.env.PORT || 3000;
let ENV;
if (process.argv[2]) {
  ENV = CONFIG.devlopment;
} else {
  ENV = CONFIG.production;
}



require('./routes/users-routes')(userRouter, models);
require('./routes/poll-routes')(pollRouter, models);
require('./routes/login-signup')(loginRouter, models);

app.use(express.static(__dirname + '/build'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ENV.url);
  res.header('Access-Control-Allow-Headers', 'Content-Type, authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


app.use('/', loginRouter, userRouter);

app.use('/users', pollRouter);



app.listen(port, () => {console.log('port up on '+ port + ' in ' + ENV.mode + ' mode');});
