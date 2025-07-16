// assets/js/products.js

// Clave para almacenar el carrito en localStorage
const CART_KEY = 'miCarrito';

// Recupera el carrito (o array vacío si no existe)
function loadCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Guarda el carrito actualizado
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Renderiza el contador en el icono
function updateCartCount() {
    const cart = loadCart();
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Añade un producto al carrito (o aumenta qty si ya existía)
function addToCart(product) {
    const cart = loadCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart(cart);
}

// Muestra el modal tras añadir producto
function showCartModal(product) {
    const modal = document.getElementById('cart-modal');
    const content = document.getElementById('modal-content');

    const cart = loadCart();
    const currentItem = cart.find(item => item.id === product.id);

    content.innerHTML = `
    <p><strong>${product.name}</strong> se ha añadido al carrito.</p>
    <p>Cantidad en carrito: ${currentItem.qty}</p>
  `;

    modal.classList.add('show');
}

// Handler para el botón “Añadir al carrito”
function addToCartHandler(event) {
    const btn = event.currentTarget;
    const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price)
    };

    addToCart(product);
    updateCartCount();
    showCartModal(product);
}

// Inicializa eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Actualiza contador
    updateCartCount();

    // Asocia handler a todos los botones
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCartHandler);
    });

    // Cerrar modal
    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('cart-modal').classList.remove('show');
    });

    // Seguir comprando
    document.getElementById('continue-shopping').addEventListener('click', () => {
        document.getElementById('cart-modal').classList.remove('show');
    });
});
