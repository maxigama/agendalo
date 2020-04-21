var express = require('express');
const { pool, sql, pool2Connect } = require('../mssqlpool')

class UserController {

  async getDataUsuario(req , res, next){
    try {

        const result = await pool.request()
        .query('SELECT * FROM [dbo].[usuario]')

        console.log("devuelve los datos de los clientes")

        res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getValidUser(req , res, next){
    try {

      const result = await pool.request()
      .input('user',sql.VarChar , req.body.usuario)
      .input('clave',sql.VarChar , req.body.clave)
      .query('SELECT * FROM Usuario where usuario = @user and clave = @clave ');    

      return result.recordset;

    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
}

const controller = new UserController()
module.exports = controller;