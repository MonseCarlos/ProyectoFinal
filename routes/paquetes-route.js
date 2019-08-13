const express = require('express');
const route = express.Router();
const PaquetsControllers = require('../app/api/controllers/paquetes');

route.get('/',PaquetsControllers.getPaq)
route.post('/add', PaquetsControllers.add);
route.post('/delete', PaquetsControllers.deletes);
route.post('/active', PaquetsControllers.active)
route.post('/update', PaquetsControllers.update);

module.exports = route