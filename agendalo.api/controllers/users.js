var express = require('express');
const { pool, sql, pool2Connect } = require('../mssqlpool')

class UserController {

  async getDataUsuario(req , res, next){
    try {

        const result = await pool.request()
        .query('SELECT * FROM [dbo].[usuario]')
       
        res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getProviderUser(usuario){
    try {

      const result = await pool.request()
      .input('sku_id',sql.VarChar , usuario.provider_id)
      .input('apiAuthProvider',sql.VarChar , usuario.provider)
      .query('SELECT * FROM Usuario where sku_id = @sku_id and apiAuthProvider = @apiAuthProvider ');

      return result.recordset;

    } catch (error) {
        console.log(error.message)
    }
  }

  async CreateProviderUser(usuario){
    try {

      const result = await pool.request()
      .input('nombre',sql.VarChar ,  usuario.name)
      .input('sku_id',sql.VarChar , usuario.provider_id)
      .input('apiAuthProvider',sql.VarChar , usuario.provider)
      .input('email',sql.VarChar , usuario.email)
      .input('foto',sql.VarChar , usuario.photo)
      .query('INSERT INTO [Usuario] ([email],[nombre],[sku_id],[apiAuthProvider],[foto],[Estado]) VALUES (@email,@nombre,@sku_id,@apiAuthProvider,@foto,1)');    

      return true;

    } catch (error) {
        console.log(error.message)
    }
  }

  async getValidUser(req , res, next){
    try {

      const result = await pool.request()
      .input('email',sql.VarChar , req.body.usuario)
      .input('clave',sql.VarChar , req.body.clave)
      .query('SELECT * FROM Usuario where email = @email and clave = @clave ');    

      return result.recordset;

    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
}

const controller = new UserController()
module.exports = controller;