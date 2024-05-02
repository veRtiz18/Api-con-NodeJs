const express = require('express');

const ProductsService = require('./../services/product.service')
const validatorHandler = require('./../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductsSchema } = require('./../schemas/product.schema')
const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const get_products = await service.find()
  res.json(get_products);
})

router.get('/:id',
  validatorHandler(getProductsSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const get_product = await service.findOne(id);
      res.json(get_product)
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct)
  })

router.patch('/:id',
  validatorHandler(getProductsSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product)
    } catch (error) {
      next(error)
    }
  });

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const answer = await service.delete(id);
  res.json(answer)
});

module.exports = router;

