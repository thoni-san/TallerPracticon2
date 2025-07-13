// Filtrado de productos por nombre

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita recarga de página
    const term = this.querySelector('input[name="query"]').value.trim().toLowerCase();

    document.querySelectorAll('.producto').forEach(card => {
        const nombre = card.dataset.nombre.toLowerCase();
        if (term === '' || nombre.includes(term)) {
            card.style.display = '';   // Mostrar tarjeta
        } else {
            card.style.display = 'none'; // Ocultar tarjeta
        }
    });
});


document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const term = this.querySelector('input[name="query"]').value.trim().toLowerCase();
    document.querySelectorAll('.producto').forEach(card => {
        const nombre = card.dataset.nombre.toLowerCase();
        card.style.display = nombre.includes(term) || term === '' ? '' : 'none';
    });
});
