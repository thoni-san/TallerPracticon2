// JS/DOM.js

document.addEventListener('DOMContentLoaded', () => {
    // Elementos Crear Cuenta
    const formCrear = document.getElementById('formCrear');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPass = document.getElementById('confirm_password');

    // Regex para validar email
    const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Funciones de ayuda
    function mostrarError(input, mensaje) {
        const span = document.getElementById(`error${capitalize(input.id)}`);
        span.textContent = mensaje;
    }
    
    function limpiarErrores(formSelector = 'span[id^="error"]') {
        document.querySelectorAll(formSelector).forEach(s => s.textContent = '');
    }
    
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // --- Validación Crear Cuenta ---
    if (formCrear) {
        formCrear.addEventListener('submit', e => {
            e.preventDefault();
            limpiarErrores();
            let valido = true;
            let camposIncompletos = []; // Array para almacenar campos incompletos

            // Validación de campos
            const campos = ['first_name', 'last_name', 'company', 'phone', 'birthdate', 'email', 'password', 'confirm_password'];
            campos.forEach(id => {
                const input = document.getElementById(id);
                if (!input.value.trim()) {
                    mostrarError(input, 'Falta completar');
                    camposIncompletos.push(input.name); // Agregar el nombre del campo incompleto
                    valido = false;
                }
            });

            // Validar correo electrónico
            if (!reEmail.test(email.value)) {
                mostrarError(email, 'Correo electrónico no válido.');
                valido = false;
            }

            // Contraseña ≥ 8 caracteres
            if (password.value.length < 8) {
                mostrarError(password, 'Mínimo 8 caracteres.');
                valido = false;
            }

            // Confirmar contraseña coincide
            if (password.value !== confirmPass.value) {
                mostrarError(confirmPass, 'No coinciden.');
                valido = false;
            }

            // Mostrar mensaje general si hay campos incompletos
            if (!valido) {
                alert('Por favor, completa todos los campos requeridos.');
            }

            // Enviar formulario si es válido
            if (valido) formCrear.submit();
        });
    }
});
