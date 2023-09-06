const express = require('express');
const router = express.Router();
const cartsControllers = require('../controllers/cartsControllers');

// Ruta para crear un nuevo carrito
router.post('/', cartsControllers.createCart);

// Ruta para obtener los productos de un carrito por su ID
router.get('/:cid', cartsControllers.getCartById);

// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', cartsControllers.addProductToCart);

module.exports = router;
