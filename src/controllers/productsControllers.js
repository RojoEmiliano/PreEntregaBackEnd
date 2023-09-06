const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "products.json"); // Ruta al archivo JSON

const getAllProducts = (req, res) => {
  try {
    // Leer el archivo JSON
    const productsData = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

    // Enviar la lista de productos como respuesta
    res.json(productsData);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

const getProductById = (req, res) => {
  const productId = req.params.pid;

  try {
    // Leer el archivo JSON
    const productsData = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

    // Buscar el producto por su ID
    const product = productsData.find((product) => product.id === productId);

    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }

    // Enviar el producto encontrado como respuesta
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

const createProduct = (req, res) => {
  const newProduct = req.body; // Datos del nuevo producto a crear

  try {
    // Leer el archivo JSON
    const productsData = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

    // Generar un nuevo ID para el producto (puedes usar alguna lógica para esto)
    const newProductId = generateNewProductId();

    // Agregar el nuevo producto al arreglo de productos
    newProduct.id = newProductId;
    productsData.push(newProduct);

    // Escribir los datos actualizados en el archivo JSON
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(productsData, null, 2),
      "utf-8"
    );

    // Enviar el nuevo producto creado como respuesta
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

const updateProduct = (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body; // Datos actualizados del producto

  try {
    // Leer el archivo JSON
    const productsData = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

    // Buscar el índice del producto a actualizar
    const productIndex = productsData.findIndex(
      (product) => product.id === productId
    );

    if (productIndex === -1) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }

    // Actualizar el producto en el arreglo de productos
    productsData[productIndex] = {
      ...productsData[productIndex],
      ...updatedProduct,
    };

    // Escribir los datos actualizados en el archivo JSON
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(productsData, null, 2),
      "utf-8"
    );

    // Enviar el producto actualizado como respuesta
    res.json(productsData[productIndex]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

const deleteProduct = (req, res) => {
  const productId = req.params.pid;

  try {
    // Leer el archivo JSON
    const productsData = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

    // Filtrar el producto a eliminar del arreglo de productos
    const updatedProductsData = productsData.filter(
      (product) => product.id !== productId
    );

    if (productsData.length === updatedProductsData.length) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }

    // Escribir los datos actualizados en el archivo JSON
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(updatedProductsData, null, 2),
      "utf-8"
    );

    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
