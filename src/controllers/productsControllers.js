const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/product.json"); // Ruta al archivo JSON

class ProductController {
  constructor() {
    this.productsData = this.readProductsFromFile();
  }

  readProductsFromFile() {
    try {
      const data = fs.readFileSync(dataFilePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProductsToFile() {
    fs.writeFileSync(dataFilePath, JSON.stringify(this.productsData, null, 2), "utf-8");
  }

  getAllProducts() {
    return this.productsData;
  }

  getProductById(productId) {
    return this.productsData.find((product) => product.id === productId);
  }

  createProduct(newProduct) {
    const productId = this.generateUniqueId();
    newProduct.id = productId;
    this.productsData.push(newProduct);
    this.saveProductsToFile();
    return newProduct;
  }

  updateProduct(productId, updatedFields) {
    const productIndex = this.productsData.findIndex((product) => product.id === productId);

    if (productIndex !== -1) {
      this.productsData[productIndex] = {
        ...this.productsData[productIndex],
        ...updatedFields,
      };
      this.saveProductsToFile();
      return this.productsData[productIndex];
    }

    return null;
  }

  deleteProduct(productId) {
    const productIndex = this.productsData.findIndex((product) => product.id === productId);

    if (productIndex !== -1) {
      const deletedProduct = this.productsData.splice(productIndex, 1)[0];
      this.saveProductsToFile();
      return deletedProduct;
    }

    return null;
  }

  generateUniqueId() {
    const maxId = this.productsData.reduce((max, product) => Math.max(max, product.id), 0);
    return maxId + 1;
  }
}

module.exports = new ProductController();
