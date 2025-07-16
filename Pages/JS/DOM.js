document.addEventListener('DOMContentLoaded', () => {
    // Elementos Crear Cuenta
    const formCrear = document.getElementById('formCrear');
    const emailUsernameInput = document.getElementById('email-username');
    const emailDomainSelect = document.getElementById('email-domain');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const progressBar = document.getElementById('progress-bar');
    const successMessage = document.getElementById('success-message');

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

            // Validación de campos
            const campos = ['first_name', 'last_name', 'company', 'phone', 'birthdate'];
            campos.forEach(id => {
                const input = document.getElementById(id);
                if (!input.value.trim()) {
                    mostrarError(input, 'Falta completar');
                    valido = false;
                }
            });

            // Validar correo electrónico
            if (emailUsernameInput.value.trim() && emailDomainSelect.value) {
                const email = `${emailUsernameInput.value.trim()}@${emailDomainSelect.value}`;
                if (!reEmail.test(email)) {
                    mostrarError(emailUsernameInput, 'Correo electrónico no válido.');
                    valido = false;
                }
            } else {
                mostrarError(emailUsernameInput, 'Falta completar el correo electrónico.');
                valido = false;
            }

            // Contraseña ≥ 8 caracteres
            if (passwordInput.value.length < 8) {
                mostrarError(passwordInput, 'La contraseña debe tener al menos 8 caracteres.');
                valido = false;
            }

            // Confirmar contraseña coincide
            if (passwordInput.value !== confirmPasswordInput.value) {
                mostrarError(confirmPasswordInput, 'Las contraseñas no coinciden.');
                valido = false;
            }

            // Enviar formulario si es válido
            if (valido) {
                // Mostrar barra de progreso
                progressBar.classList.remove('w-0');
                progressBar.classList.add('w-full');

                // Simulación de tiempo de proceso
                formCrear.classList.add('opacity-50', 'pointer-events-none');

                setTimeout(() => {
                    // Ocultar barra de progreso
                    progressBar.classList.remove('w-full');
                    progressBar.classList.add('w-0');

                    // Mostrar mensaje de éxito
                    successMessage.classList.remove('opacity-0');
                    successMessage.classList.add('opacity-100');

                    // Enviar formulario
                    formCrear.submit();
                }, 5000); // Tiempo de proceso simulado (5 segundos)
            }
        });
    }
});
