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

// Renderiza el contador en el ícono del carrito
function updateCartCount() {
    const cart = loadCart();
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
    }
}

// Añade un producto al carrito (o aumenta cantidad si ya existe)
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

// Muestra el modal tras añadir un producto
function showCartModal(product) {
    const modal = document.getElementById('cart-modal');
    const content = document.getElementById('modal-content');
    const cart = loadCart();
    const currentItem = cart.find(item => item.id === product.id);

    if (modal && content && currentItem) {
        content.innerHTML = `
            <p><strong>${product.name}</strong> se ha añadido al carrito.</p>
            <p>Cantidad en carrito: ${currentItem.qty}</p>
        `;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

// Manejador para botón "Comprar"
function addToCartHandler(event) {
    const btn = event.currentTarget;
    const { id, name, price } = btn.dataset;

    // Validación básica de atributos
    if (!id || !name || !price) return;

    const product = {
        id: id,
        name: name,
        price: parseFloat(price)
    };

    addToCart(product);
    updateCartCount();
    showCartModal(product);
}

// Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Botones de compra
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCartHandler);
    });

    // Modal y botones
    const modal = document.getElementById('cart-modal');
    const closeModal = document.getElementById('close-modal');
    const continueBtn = document.getElementById('continue-shopping');

    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        });
    }

    if (continueBtn && modal) {
        continueBtn.addEventListener('click', () => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        });
    }
});
