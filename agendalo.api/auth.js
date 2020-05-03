// auth.js
//Autenticacion normar de usuario registrado

var express = require('express');
var service = require('./service');
const usercontroller = require('./controllers/users')

exports.emailLogin = function(req, res,next) {
 
    usercontroller.getValidUser(req,res,next)
            .then((result)=>{
                    
                    if(result.length > 0)
                    {
                        return res
                        .status(200)
                        .send({token: service.createToken(result)}); 
                    }
                    else{
                        return res.status(500)
                                .send();
                    }
            }); 
};