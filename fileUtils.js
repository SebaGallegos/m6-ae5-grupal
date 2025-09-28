const fs = require('fs');
const path = require('path');

const readProducts = () => {
  const filePath = path.join(__dirname, 'products.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const saveProducts = (products) => {
  const filePath = path.join(__dirname, 'products.json');
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}

const writeProducts = (products) => {

};

const deleteProduct = (id) => {

};

const updateProduct = (id, newData) => {

};

module.exports = {
  readProducts,
  writeProducts,
  deleteProduct,
  updateProduct
};