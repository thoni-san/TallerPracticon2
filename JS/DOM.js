// JS/DOM.js

document.addEventListener('DOMContentLoaded', () => {
    // Elementos Crear Cuenta
    const formCrear = document.getElementById('formCrear');
    const usuario = document.getElementById('usuario');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPass = document.getElementById('confirmPassword');

    // Elementos Iniciar Sesión
    const formLogin = document.getElementById('formLogin');
    const emailL = document.getElementById('emailLogin');
    const passL = document.getElementById('passwordLogin');

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

            if (!usuario.value.trim() || usuario.value.trim().length < 3) {
                mostrarError(usuario, 'Mínimo 3 caracteres.');
                valido = false;
            }
            if (!reEmail.test(email.value)) {
                mostrarError(email, 'Email no válido.');
                valido = false;
            }
            if (password.value.length < 6) {
                mostrarError(password, 'Mínimo 6 caracteres.');
                valido = false;
            }
            if (password.value !== confirmPass.value) {
                mostrarError(confirmPass, 'No coinciden.');
                valido = false;
            }

            if (valido) formCrear.submit();
        });
    }

    // --- Validación Iniciar Sesión ---
    if (formLogin) {
        formLogin.addEventListener('submit', e => {
            e.preventDefault();
            limpiarErrores('span[id^="errorEmailLogin"], span[id^="errorPasswordLogin"]');
            let valido = true;

            if (!reEmail.test(emailL.value)) {
                mostrarError(emailL, 'Email no válido.');
                valido = false;
            }
            if (!passL.value || passL.value.length < 6) {
                mostrarError(passL, 'Mínimo 6 caracteres.');
                valido = false;
            }

            if (valido) formLogin.submit();
        });
    }
});
