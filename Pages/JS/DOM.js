document.addEventListener('DOMContentLoaded', () => {
    // Elementos Crear Cuenta
    const formCrear = document.getElementById('formCrear');
    const emailUsernameInput = document.getElementById('email-username');
    const emailDomainSelect = document.getElementById('email-domain');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
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
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                document.getElementById('errorEmail').textContent = 'Correo electrónico no válido';
                todoOk = false;
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
                    // Ocultar el mensaje de carga
                    loadingMessage.remove();

                    // Mostrar el mensaje de registro exitoso
                    successMessage.classList.remove('hidden');
                    successMessage.classList.remove('text-white', 'bg-gray-900');
                    successMessage.classList.add('text-green-500', 'bg-green-100');

                    // Enviar formulario
                    formCrear.submit();
                }, 2000); // Tiempo de proceso simulado (2 segundos)

            }
        });
    }
});
