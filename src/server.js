const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar Handlebars como motor de plantillas
const hbs = exphbs.create({ /* configuración de Handlebars aquí */ });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Establecer la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));

// Establecer carpeta de archivos estáticos (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Importar tus rutas y controladores aquí
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

// Usar las rutas en la aplicación
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta para la página de inicio
app.get('/', (req, res) => {
  // Lógica para obtener los productos u otros datos que desees mostrar
  const products = obtenerProductos(); // Reemplaza con tu lógica para obtener productos

  // Renderiza la vista con los datos
  res.render('home', { products });
});

// Manejar WebSockets
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Manejar eventos de WebSockets aquí, como 'nuevoProducto' y 'eliminarProducto'
  socket.on('nuevoProducto', (nuevoProducto) => {
    // Lógica para agregar el nuevo producto al carrito
    // Emitir el producto actualizado a la vista en tiempo real
    io.emit('nuevoProducto', nuevoProducto);
  });

  socket.on('eliminarProducto', (idProducto) => {
    // Lógica para eliminar el producto del carrito
    // Emitir la actualización a la vista en tiempo real
    io.emit('eliminarProducto', idProducto);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

// Función para obtener productos
function obtenerProductos() {
  const productController = require('./controllers/productsControllers');
  return productController.getAllProducts();
}
