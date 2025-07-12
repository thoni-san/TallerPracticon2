document.addEventListener("DOMContentLoaded", () => {
  const btnAdd = document.getElementById("btnAdd");
  const tableBody = document.querySelector("#commentsTable tbody");

  btnAdd.addEventListener("click", () => {
    const nombre = document.getElementById("inputName").value.trim();
    const apellido = document.getElementById("inputLastname").value.trim();
    const correo = document.getElementById("inputEmail").value.trim();
    const celular = document.getElementById("inputPhone").value.trim();
    const profesion = document.getElementById("inputProfession").value.trim();
    const direccion = document.getElementById("inputAddress").value.trim();
    const comentario = document.getElementById("inputComment").value.trim();

    // Validación básica
    if (!nombre || !apellido || !correo || !celular || !profesion || !direccion || !comentario) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Crear fila nueva
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td class="border px-4 py-2">${nombre}</td>
      <td class="border px-4 py-2">${apellido}</td>
      <td class="border px-4 py-2">${correo}</td>
      <td class="border px-4 py-2">${celular}</td>
      <td class="border px-4 py-2">${profesion}</td>
      <td class="border px-4 py-2">${direccion}</td>
      <td class="border px-4 py-2">${comentario}</td>
    `;

    tableBody.appendChild(newRow);

    // Limpiar campos
    document.getElementById("inputName").value = "";
    document.getElementById("inputLastname").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputPhone").value = "";
    document.getElementById("inputProfession").value = "";
    document.getElementById("inputAddress").value = "";
    document.getElementById("inputComment").value = "";
  });
});
