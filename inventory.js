console.log("JS NOVO CARREGADO", new Date().toISOString());

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby0wr_7UW6BGG_QbkGfS8ZME9HZqk34UnrC8FdemsTfQshw3DT9Avwiz16rZxwT8-HD/exec";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("submitBtn");

  if (!btn) {
    console.error("Botão submitBtn não encontrado");
    return;
  }

  btn.onclick = async () => {
    const payload = {
      user_email: document.getElementById("user_email").value,
      source: document.getElementById("source").value,
      type: document.getElementById("type").value,
      client: document.getElementById("client").value,
      amount: document.getElementById("amount").value,
      item: document.getElementById("item").value,
      description: document.getElementById("description").value
    };

    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      alert("Enviado com sucesso");
      console.log(json);

    } catch (err) {
      console.error("Erro no envio", err);
      alert("Erro ao enviar");
    }
  };
});
