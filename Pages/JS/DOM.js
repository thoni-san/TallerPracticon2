document.addEventListener('DOMContentLoaded', () => {
    // Elementos Crear Cuenta
    const formCrear = document.getElementById('formCrear');
    const emailUsernameInput = document.getElementById('email-username');
    const emailDomainSelect = document.getElementById('email-domain');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');

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
                // Simulación de tiempo de proceso
                formCrear.classList.add('opacity-50', 'pointer-events-none');
                const loadingMessage = document.createElement('div');
                loadingMessage.textContent = 'Procesando, por favor espere...';
                loadingMessage.classList.add('fixed', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'bg-gray-900', 'text-white', 'px-4', 'py-2', 'rounded-lg');
                document.body.appendChild(loadingMessage);

                setTimeout(() => {
                    formCrear.submit();
                }, 2000); // Tiempo de proceso simulado (2 segundos)
            }
        });
    }
});
