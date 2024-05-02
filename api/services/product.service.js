const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');



class ProductsService {

  constructor() {
    this.productos = [];
    this.generate();
  }

  async generate() {
    const limit = 100

    for (let index = 0; index < limit; index++) {
      this.productos.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        price: parseInt(faker.commerce.price({ min: 1000, max: 3000, dec: 0 })),
        image: faker.image.url,
        isBlock:faker.datatype.boolean(),
      })
    }
  }

  async create(body) {
    const newProduct = {
      id: parseInt(faker.commerce.price({ min: 10, max: 300, dec: 0 })),
      ...body
    }
    this.productos.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.productos)
      }, 5000)
    })
  }

  async findOne(id) {
    const product = this.productos.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, body) {
    const index = this.productos.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.productos[index];

    this.productos[index] = {
      ...product,
      ...body
    };
    return this.productos[index];
  }


  async delete(id) {
    const index = this.productos.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.productos.splice(index, 1)
    return { id };
  }
}

module.exports = ProductsService;
