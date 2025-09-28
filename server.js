const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json()); // to parse JSON-formatted body

// POST /products
app.post('/products', (req, res) => {
  // TODO: Endpoint para guardar un producto
});

// GET /products
app.get('/products', (req, res) => {
  // TODO: Endpoint para listar todos los productos
});

// PUT /products/:id
app.put('/products/:id', (req, res) => {
  // TODO: Endpoint para actualizar un producto por id
});

// DELETE /products/:id
app.delete('/products/:id', (req, res) => {
  // TODO: Endpoint para eliminar un producto por id
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});