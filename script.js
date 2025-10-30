
const WEBHOOK_URL = "https://webhook.site/b6f74f2b-d513-4e7c-9503-169d65dd708f";

// Mostrar mensajes
function showMessage(text, type = "success") {
  const msg = document.getElementById("form-message");
  msg.textContent = text;
  msg.className = `message ${type}`;
}

// Envío del formulario
document.getElementById("the-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;

  if (!form.checkValidity()) {
    showMessage("Por favor complete correctamente los campos.", "error");
    form.reportValidity();
    return;
  }

  const pin = document.getElementById("pin").value.trim();
  if (!/^\d{4}$/.test(pin)) {
    showMessage("El PIN debe tener 4 dígitos.", "error");
    return;
  }

  const data = {
    name: form.name.value,
    email: form.email.value,
    pin: pin,
    gender: form.gender.value,
    age: form.age.value,
    submittedAt: new Date().toISOString(),
  };

  showMessage("Enviando datos...");

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      showMessage("Datos enviados con éxito. ¡Gracias!");
      form.reset();
    } else {
      showMessage("Error del servidor: " + res.status, "error");
    }
  } catch (err) {
    showMessage("Error al enviar: " + err.message, "error");
  }
});
const now = new Date();
document.getElementById("created-date").textContent = "Fecha de creación: " + now.toLocaleDateString() + " - Bienvenido a la práctica.";

const hour = now.getHours();
