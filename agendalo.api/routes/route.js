const express =  require('express');
const usercontroller = require('./users')
var authCtrl = require('./auth');
var middlewareCtrl = require('../middleware');
const router = express.Router();

// Rutas de autenticación y login
router.post('/auth/login', authCtrl.emailLogin);

// Ruta solo accesible si estás autenticado
router.get('/users/getDataUsuario', middlewareCtrl.ensureAuthenticated, usercontroller.getAllData);

/*router.post;
router.put;
router.delete;*/

 

module.exports = router;