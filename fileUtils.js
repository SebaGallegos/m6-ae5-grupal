const fs = require('fs');
const path = require('path');

// GET /products
const readProducts = () => {
  const filePath = path.join(__dirname, 'products.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// Helper para escribir en el archivo products.json
const saveProducts = (products) => {
  const filePath = path.join(__dirname, 'products.json');
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}

// POST /products
const writeProducts = (products) => {
  const currentProducts = readProducts();
  const lastId = currentProducts.length > 0 ? currentProducts.at(-1).id : 0;
  const newProduct = { id: lastId + 1, ...products };
  currentProducts.push(newProduct);
  saveProducts(currentProducts);
  return newProduct;
};

// DELETE /products/:id
const deleteProduct = (id) => {
  const products = readProducts();
  // necesitamos convertir id a número porque viene como string
  const updatedProducts = products.filter((product) => product.id !== +id);
  if (products.length === updatedProducts.length) {
    // No se encontró el producto
    return false;
  } else {
    saveProducts(updatedProducts);
    // Producto eliminado exitosamente
    return true;
  }
};

// PUT /products/:id
const updateProduct = (id, newData) => {
  const products = readProducts();
  const productIndex = products.findIndex((product) => product.id === +id);
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...newData };
    saveProducts(products);
    return products[productIndex];
  }

  return null;
};

module.exports = {
  readProducts,
  writeProducts,
  deleteProduct,
  updateProduct
};