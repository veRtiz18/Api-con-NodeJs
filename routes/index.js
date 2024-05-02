const express = require('express')


const productosRouter = require('./products.router')
const usersRouter = require('./users.router')
const categoriasRouter = require('./categorias.router')


function routerApi(app) {

  const router = express.Router();
  app.use('/api/v1', router) //Generacion de path global para todos los endpoints

  router.use('/products', productosRouter)
  router.use('/users', usersRouter)
  router.use('/categorias', categoriasRouter)
}


module.exports = routerApi
