// JS/feedback.js

document.addEventListener('DOMContentLoaded', () => {
    const btnAdd = document.getElementById('btnAdd');
    const inputName = document.getElementById('inputName');
    const inputEmail = document.getElementById('inputEmail');
    const inputComment = document.getElementById('inputComment');
    const tbody = document.querySelector('#commentsTable tbody');

    btnAdd.addEventListener('click', () => {
        const name = inputName.value.trim();
        const email = inputEmail.value.trim();
        const comment = inputComment.value.trim();

        if (!name || !email || !comment) {
            alert('Por favor completa todos los campos antes de agregar.');
            return;
        }

        const row = document.createElement('tr');

        const tdName = document.createElement('td');
        tdName.textContent = name;
        tdName.classList.add('px-4', 'py-2', 'border-b');

        const tdEmail = document.createElement('td');
        tdEmail.textContent = email;
        tdEmail.classList.add('px-4', 'py-2', 'border-b');

        const tdComment = document.createElement('td');
        tdComment.textContent = comment;
        tdComment.classList.add('px-4', 'py-2', 'border-b');

        row.append(tdName, tdEmail, tdComment);
        tbody.appendChild(row);

        // Limpia los campos
        inputName.value = '';
        inputEmail.value = '';
        inputComment.value = '';
    });
});
