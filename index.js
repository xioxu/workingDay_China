'use strict';
const express = require('express');
const holiday = require('./holiday');
var bodyParser = require('body-parser')

const fs = require('fs');
const app = express()
const port = 3003

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//注册工作日相关API
//holiday.regist(app.route('/calendar'));
app.use('/calendar', function(){
  var router = express.Router();
  holiday.regist(router);
  return router;
}());

app.listen(port, () => {
    console.log(`HuaweiClould Token Provider Service listening at http://localhost:${port}`)
  })