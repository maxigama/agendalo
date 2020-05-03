const express =  require('express');
const usercontroller = require('../controllers/users')
const comercioController = require('../controllers/comercio')
const passport = require('../authApi');
 
  var authCtrl = require('../auth');
  var middlewareCtrl = require('../middleware');
  const router = express.Router();
  var service = require('../service');

  // Rutas de autenticación y login
  router.post('/auth/login', authCtrl.emailLogin);

  //Ruta para redireccion de Token
  router.get('/', function(req, res) { 
   
      console.log(user);
      if(user == undefined)
      {
          return res
                .status(500);
      }
      else
      {
        return res
              .status(200)
              .send({token: service.createToken(user)}); 
      }
  });

  // Authentication route
  //Ruta para obtener token facebook
  router.get('/auth/facebook/', passport.authenticate('facebook'));

  router.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
          successRedirect : '/',
          failureRedirect : '/Fail'
    }));


    /***********************Rutas para los controlladores */

    // Ruta solo accesible si estás autenticado
    router.get('/users/getDataUsuario', middlewareCtrl.ensureAuthenticated, usercontroller.getDataUsuario);
    
    //Ruta para get Comercios
    router.get('/comercio/getComercio', middlewareCtrl.ensureAuthenticated, comercioController.getComercio);
    
    //Ruta para Listar Comercios
     router.get('/comercio/ListaComercio', middlewareCtrl.ensureAuthenticated, comercioController.ListaComercio);
    
     //Ruta para actualizar Comercios
     router.put('/comercio/ActualizarComercio', middlewareCtrl.ensureAuthenticated, comercioController.ActualizarComercio);
    
     //Ruta para actualizar Comercios
     router.post('/comercio/NuevoComercio', middlewareCtrl.ensureAuthenticated, comercioController.NuevoComercio);
    

  module.exports = router;