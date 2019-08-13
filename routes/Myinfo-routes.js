const express = require('express');
const route = express.Router();
const MyinfoControllers = require('../app/api/controllers/Myinfo');

route.get('/', MyinfoControllers.getInfo);

module.exports = route