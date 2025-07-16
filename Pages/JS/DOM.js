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
            if (!passL.value || passL.value.length < 8) {
                mostrarError(passL, 'Mínimo 8 caracteres.');
                valido = false;
            }

            if (valido) formLogin.submit();
        });
    }
});


function validarFormulario() {
    const campos = ['first_name', 'last_name', 'company', 'phone', 'birthdate', 'email', 'password', 'confirm_password'];
    let todoOk = true;

    // Limpia errores
    campos.forEach(id => {
        document.getElementById('error' + capitalize(id)).textContent = '';
    });

    // Verifica vacíos
    campos.forEach(id => {
        const val = document.getElementById(id).value.trim();
        if (!val) {
            document.getElementById('error' + capitalize(id)).textContent = 'Falta completar';
            todoOk = false;
        }
    });

    // Validar correo electrónico
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        document.getElementById('errorEmail').textContent = 'Correo electrónico no válido';
        todoOk = false;
    }

    // Contraseña ≥ 8 caracteres
    const pwd = document.getElementById('password').value;
    if (pwd && pwd.length < 8) {
        document.getElementById('errorPassword').textContent = 'Mínimo 8 caracteres';
        todoOk = false;
    }

    // Confirmar contraseña coincide
    const cpwd = document.getElementById('confirm_password').value;
    if (pwd && cpwd && pwd !== cpwd) {
        document.getElementById('errorConfirm_password').textContent = 'No coinciden';
        todoOk = false;
    }

    if (todoOk) {
        // Aquí puedes enviar el formulario o hacer otra acción
        document.getElementById('formCrear').submit();
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
