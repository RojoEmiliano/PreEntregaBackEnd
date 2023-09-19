var socket = io();

// Escuchar el evento para actualizar la lista de productos en tiempo real
socket.on('updateProducts', function(products) {
    var productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(function(product) {
        var listItem = document.createElement('li');
        listItem.textContent = product;
        productList.appendChild(listItem);
    });
});

// Manejar el envío del formulario para agregar productos
var productForm = document.getElementById('product-form');
productForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var productName = document.getElementById('product-name').value;

    // Emitir un evento al servidor para agregar un producto
    socket.emit('addProduct', productName);
    document.getElementById('product-name').value = '';
});
