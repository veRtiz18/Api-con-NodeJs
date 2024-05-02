const express = require('express');
const router = express.Router();


//// enpoind con dos parametros:
router.get('/:id_categoria/products/:id_producto', (req, res) => {
  const { id_categoria, id_producto } = req.params;
  res.json({
    id_categoria,
    id_producto
  })
})
module.exports = router;
