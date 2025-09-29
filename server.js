const express = require('express');
const {
  readProducts,
  writeProducts,
  deleteProduct,
  updateProduct } = require('./fileUtils');
const app = express();
const PORT = 3000;

app.use(express.json());

// POST /products
app.post('/products', (req, res) => {
  const newProduct = req.body;
  writeProducts(newProduct);
  res.send({ message: 'Producto creado exitosamente!', product: newProduct });
});

// GET /products
app.get('/products', (req, res) => {
  const products = readProducts();
  res.set('Cache-Control', 'no-store'); // No cache, siempre "productos frescos"
  if (products.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No hay productos disponibles",
      productos: []
    });
  } else {
    res.json({
      success: true,
      message: "Productos obtenidos exitosamente",
      productos: products
    });
  }
});

// PUT /products/:id
app.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;
  const updatedProduct = updateProduct(productId, updatedData);
  if (updatedProduct) {
    res.send({ message: 'Producto actualizado exitosamente!', product: updatedProduct });
  } else {
    res.status(404).send({ message: 'Producto no encontrado', productId });
  }
});

// DELETE /products/:id
app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  const isDeleted = deleteProduct(productId);
  if (isDeleted) {
    res.send({ message: 'Producto eliminado exitosamente', productId });
  } else {
    res.status(404).send({ message: 'Producto no encontrado', productId });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});