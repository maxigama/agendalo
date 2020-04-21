// auth.js
var express = require('express');
var service = require('../service');
const usercontroller = require('./users')

exports.emailLogin = function(req, res,next) {

    console.log("entro autenticar");
  
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