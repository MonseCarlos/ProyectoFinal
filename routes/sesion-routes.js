const express = require('express');
const route = express.Router();
const SesionControllers = require('../app/api/controllers/sesiones');


route.post('/add', SesionControllers.add);
route.post('/delete',SesionControllers.deletes);
route.post('/update',SesionControllers.update);
route.get('/',SesionControllers.getSesion);

module.exports = route