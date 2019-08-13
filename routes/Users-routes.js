const express = require('express');
const route = express.Router();
const UsersControllers = require('../app/api/controllers/users');


route.post('/add', UsersControllers.add);
route.post('/delete', UsersControllers.deletes);
route.post('/update', UsersControllers.update);
route.post('/login', UsersControllers.login)

module.exports = route