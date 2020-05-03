var express = require('express');
const { pool, sql, pool2Connect } = require('../mssqlpool')

class ComercioController {
  
  async NuevoComercio(req , res, next){
    try {
      
      var sentencia = 'INSERT INTO [dbo].[Comercio] ' +
                            '([numero]     '    +
                            ',[razonSocial] ' + 
                            ',[denominacion]' +
                            ',[codigoPostal]' +
                            ',[idProvincia]' +
                            ',[telefono]' +
                            ',[direccion]' +
                            ',[email]' +
                            ',[cuit]' +
                            ',[idRubro]' +
                            ',[estado]' +
                            ',[fechaAlta]) ' +
                        ' VALUES ' +
                            '(@numero' +
                            ',@razonSocial' +
                            ',@denominacion' +
                            ',@codigoPostal' +
                            ',@idProvincia' +
                            ',@telefono' +
                            ',@direccion' +
                            ',@email' +
                            ',@cuit' +
                            ',@idRubro' +
                            ',1' +
                            ',GETDATE())';

        console.log(req.body);

       const result = await pool.request()
            .input('numero',sql.Int , req.body.numero)
            .input('razonSocial',sql.VarChar(250) , req.body.razonSocial)
            .input('denominacion',sql.VarChar(250) , req.body.denominacion)
            .input('codigoPostal',sql.Int , req.body.codigoPostal)
            .input('idProvincia',sql.Int , req.body.idProvincia)
            .input('telefono',sql.VarChar(50) , req.body.telefono)
            .input('direccion',sql.VarChar(350) , req.body.direccion)
            .input('email',sql.VarChar(250), req.body.email)
            .input('cuit',sql.VarChar(250) , req.body.cuit)   
            .input('idRubro',sql.Int , req.body.idRubro)   
            .query(sentencia);    
        
      return res.status(200)
                .send();
       
      
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async ActualizarComercio(req , res, next){
    try {

      const result = await pool.request()
      .input('telefono',sql.VarChar , req.body.telefono)
      .input('direccion',sql.VarChar , req.body.direccion)
      .input('idComercio',sql.VarChar , req.body.idComercio)
      .query('UPDATE Comercio set telefono = @telefono, direccion = @direccion where idComercio = @idComercio ');    

      return res.status(200);

    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async BorrarComercio(req , res, next){
    try {

        const result = await pool.request()
        .input('idComercio',sql.VarChar , req.body.idComercio)
        .query('UPDATE Comercio set estado = 0 where idComercio = @idComercio ');    
  
        return res.status(200);

      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
  }

  async ListaComercio(req , res, next){
    try {

      const result = await pool.request()
      .query('SELECT * from Comercio where estado = 1');    

      return res.json(result.recordset);

    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getComercio(req , res, next){
    try {

      const result = await pool.request()
      .input('idComercio',sql.VarChar , req.body.idComercio)
      .query('SELECT * from Comercio where idComercio = @idComercio');    

      return res.json(result.recordset);

    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

}

const controller = new ComercioController()
module.exports = controller;