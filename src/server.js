const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

// Importa y utiliza tus archivos de rutas aquí
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const productsControllers = require('./controllers/productsControllers');
const cartsControllers = require ('./controllers/cartsControllers')


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
