# Ejercicio grupal

## Autores

- Sebastián Gallegos Frías.
- Carlos Pizarro Morales.

## Contexto

Desarrollar una pequeña aplicación en Node.js que simule un sistema de gestión de  inventarios, donde se almacenan productos (como nombre, precio, cantidad, etc.) en archivos JSON. Se debe poder agregar, leer, modificar y eliminar productos sin utilizar base de datos, solo archivos de texto plano.

## Instrucciones

### 1. Configuración Inicial del Proyecto

- 🆗 Crea un proyecto Node.js utilizando `npm init` y asegúrate de que tengas un archivo `package.json` configurado correctamente.
- 🆗 Instala los siguientes paquetes necesarios:
  - `fs` (modulo nativo de Node.js para interactuar con el sistema de archivos).
  - `express` para montar el servidor web.

### 2. Estructura de Archivos

- 🆗 Crea un archivo llamado `products.json` en la raíz del proyecto. Este archivo se usará para almacenar los productos en formato JSON. Inicia con un arreglo vacío [] como contenido.
- 🆗 Crea un archivo llamado `server.js` que será el encargado de montar el servidor Express.
- 🆗 Crea otro archivo llamado `fileUtils.js` que contendrá las funciones necesarias para interactuar con el archivo products.json.

### 3. Implementación de Funcionalidades

#### 3.1 Crear un Producto

- 🆗 Crea una ruta POST /products que permita agregar un producto al inventario. El cuerpo de la solicitud debe contener las propiedades del producto, como:
  - id (número único)
  - name (nombre del producto)
  - price (precio)
  - quantity (cantidad disponible)

> Después de recibir la solicitud, la tarea debe guardarse en el archivo products.json usando el módulo fs.

#### 3.2 Obtener Todos los Productos

- 🆗 Crea una ruta `GET /products` que lea el archivo `products.json` y devuelva todos los productos en formato JSON.

#### 3.3 Modificar un Producto

- 🆗 Crea una ruta `PUT /products/:id` que permita actualizar un producto específico en el inventario. Los parámetros que pueden modificarse son:
  - name (nombre del producto)
  - price (precio)
  - quantity (cantidad)

> La tarea seleccionada se debe identificar por su id y actualizarse en el archivo `products.json`.

#### 3.4 Eliminar un Producto

- 🆗 Crea una ruta `DELETE /products/:id` que elimine un producto según su id.

### 4. Uso del Sistema de Archivos

Para todas las rutas mencionadas, se deberá interactuar con el archivo `products.json`:

- 🆗 Escribir en el archivo: Utiliza `fs.writeFileSync()` para guardar los datos actualizados.
- 🆗 Leer desde el archivo: Utiliza `fs.readFileSync()` para cargar los datos cuando sea necesario.

### 5. Modularización del Código

En `fileUtils.js`, crea funciones que manejen las operaciones de lectura, escritura y eliminación de productos en el archivo `products.json`:

- 🆗 `readProducts()`: Lee el archivo y devuelve el contenido en formato JSON.
- 🆗 `writeProducts()`: Escribe los productos actualizados en el archivo `products.json`.
- 🆗 `deleteProduct(id)`: Elimina un producto por su id del archivo.
- 🆗 `updateProduct(id, newData)`: Actualiza la información de un producto por su id.

🆗 En `server.js`, importa y usa estas funciones para manejar las operaciones CRUD (crear, leer, actualizar y eliminar) dentro de las rutas correspondientes.

## Implementación

- "*Crear un producto*"  se realiza a través de `writeProducts()` por el endpoint `POST /products`.
- "*Obtener todos los productos*" se realiza a través de `readProducts()` por el endpoint `GET /products`.
- "*Eliminar un producto*" se realiza a través de `deleteProduct(id)` por el endpoint `DELETE /products/:id`.
- "*Actualizar un producto*" se realiza a través de `updateProduct(id, newData)` por el endpoint `PUT /products/:id`.
- Se ha creado un método adicional `saveProducts(newProduct)` para escribir a `products.json`. Es la función "de bajo nivel" que utiliza la API tanto en `POST /products` como en `PUT /products/:id`.

### Probando la API

Se ha utilizado `curl` para testear los endpoints creados. Acá el set de comandos que puedes utilizar en tu terminal:

```bash
# Crear un producto
curl -X POST -H "Content-Type: application/json" -d '{"name":"Computador gamer con GTX1060 😕","price":1000, "quantity":5}' http://localhost:3000/products

# Obtener todos los productos
# Puedes omitir el verbo GET ya que es
# el verbo por defecto en curl
curl http://localhost:3000/products

# También puedes usar jq si lo tienes instalado
# en tu pc para formatear la salida JSON.
curl -s http://localhost:3000/products | jq

# Actualizar un producto
curl -X PUT -H "Content-Type: application/json" -d '{"name":"Computador gamer con RTX5090 🥰", "price":5000, "quantity":3}' http://localhost:3000/products/1

# Eliminar un producto
curl -X DELETE http://localhost:3000/products/1
```
