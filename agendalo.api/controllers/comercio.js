var express = require('express');
const { pool, sql, pool2Connect } = require('../mssqlpool')

class ComercioController {
  
  async NuevoComercio(req , res, next){
    try {
      
      var sentencia = 'INSERT INTO [dbo].[Comercio]' +
                            '([numero]     '    +
                            ',[razonSocial] ' + 
                            ',[denominacion]' +
                            ',[codigoPostal]' +
                            ',[idProvincia] ' +
                            ',[telefono]    ' +
                            ',[direccion]   ' +
                            ',[email]       ' +
                            ',[cuit]        ' +
                            ',[idRubro]     ' +
                            ',[estado]      ' +
                            ',[fechaAlta])  ' +
                        'VALUES             ' +
                            '(@numero       ' +
                            ',@razonSocial  ' +
                            ',@denominacion ' +
                            ',@codigoPostal ' +
                            ',@idProvincia  ' +
                            ',@telefono     ' +
                            ',@direccion    ' +
                            ',@email        ' +
                            ',@cuit         ' +
                            ',@idRubro      ' +
                            ',@estado       ' +
                            ',@fechaAlta)';

       const result = await pool.request()
      .input('numero',sql.Int , req.body.numero)
      .input('razonSocial',sql.VarChar , req.body.razonSocial)
      .input('denominacion',sql.VarChar , req.body.denominacion)
      .input('codigoPostal',sql.VarChar , req.body.codigoPostal)
      .input('idProvincia',sql.Int , req.body.idProvincia)
      .input('telefono',sql.VarChar , req.body.telefono)
      .input('direccion',sql.VarChar , req.body.direccion)
      .input('email',sql.VarChar , req.body.email)
      .input('cuit',sql.VarChar , req.body.cuit)   
      .input('idRubro',sql.int , req.body.idRubro)   
      .query(sentencia);    

      return result.recordset;

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

      return result.recordset;

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
  
        return result.recordset;
  
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
  }

  async ListaComercio(req , res, next){
    try {

      const result = await pool.request()
      .query('SELECT * from Comercio where estado = 1');    

      return result.recordset;

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

      return result.recordset;

    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

}

const controller = new ComercioController()
module.exports = controller;