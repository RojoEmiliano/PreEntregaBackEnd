const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsControllers");

// Obtener todos los productos
router.get("/", (req, res) => {
  const products = productController.getAllProducts();
  res.json(products);
});

// Obtener un producto por ID
router.get("/:pid", (req, res) => {
  const { pid } = req.params;
  const product = productController.getProductById(pid);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(product);
});

// Crear un nuevo producto
router.post("/", (req, res) => {
  const newProduct = req.body;
  const createdProduct = productController.createProduct(newProduct);
  res.status(201).json(createdProduct);
});

// Actualizar un producto
router.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const updatedFields = req.body;
  const updatedProduct = productController.updateProduct(pid, updatedFields);

  if (!updatedProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(updatedProduct);
});

// Eliminar un producto
router.delete("/:pid", (req, res) => {
  const { pid } = req.params;
  const deletedProduct = productController.deleteProduct(pid);

  if (!deletedProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.status(204).send(); // Respuesta exitosa sin contenido
});

module.exports = router;
