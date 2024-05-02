const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.json([
    {
      nombre: "Carlos",
      total_compra: 5000
    },
    {
      nombre: "Juan",
      total_compra: 25000
    }
  ])
})

router.get('/findById/:id_cliente', (req, res) => {
  const { id_cliente } = req.params
  res.json({
    id_cliente,
    nombre: "Marisol",
    total_compra: 2365
  })
})

router.get('/query_paremeters', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json(
      {
        limit, offset
      })
  } else {
    res.send('No hay parametros');
  }
})

module.exports = router;
