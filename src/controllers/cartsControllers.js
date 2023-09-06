// Importa fs y otras dependencias necesarias
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'carrito.json'); // Ruta al archivo JSON

// Array para simular el almacenamiento de carritos en memoria
// Resto del código...

const createCart = (req, res) => {
    // Genera un nuevo carrito con un ID único
    const newCart = {
      id: generateUniqueId(),
      products: [],
    };
  
    // Agrega el nuevo carrito al arreglo de carritos
    carts.push(newCart);
  
    // Guarda el carrito en el archivo carrito.json (persistencia)
    saveCartsToFile();
  
    res.json(newCart);
  };
  
  const getCartById = (req, res) => {
    const { cid } = req.params;
  
    // Busca el carrito por su ID en el arreglo de carritos
    const cart = carts.find((c) => c.id === cid);
  
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
  
    res.json(cart);
  };
  
  const addProductToCart = (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
  
    // Busca el carrito por su ID en el arreglo de carritos
    const cart = carts.find((c) => c.id === cid);
  
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
  
    // Agrega el producto al carrito (solo el ID del producto y la cantidad)
    cart.products.push({ product: pid, quantity });
  
    // Guarda el carrito actualizado en el archivo carrito.json (persistencia)
    saveCartsToFile();
  
    res.json(cart);
  };
  
  // Función para guardar los carritos en el archivo carrito.json
  function saveCartsToFile() {
    try {
      // Escribe los datos de los carritos en el archivo JSON
      fs.writeFileSync(dataFilePath, JSON.stringify(carts, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error al guardar los carritos en el archivo carrito.json', error);
    }
  }
  
  // Resto del código...
  
  module.exports = {
    createCart,
    getCartById,
    addProductToCart,
  };
  