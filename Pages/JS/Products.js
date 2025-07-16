// assets/js/products.js

// Objeto que guarda el carrito en localStorage
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

// Añade un producto (o aumenta qty si ya estaba)
function addToCart(product) {
  const cart = loadCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
}

// Al hacer clic en “Añadir al carrito”
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = {
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: parseFloat(btn.dataset.price)
    };
    addToCart(product);
    // Opcional: redirigir directamente al carrito
    window.location.href = 'Cart.html';
  });
});

// Al cargar la página, poner el número correcto
document.addEventListener('DOMContentLoaded', updateCartCount);
