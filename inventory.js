console.log("JS NOVO CARREGADO", new Date().toISOString());

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwbi5d7kMculUWgXoiDqYW6swPmF3qvHNe-PT_tEzQZUpRjzsbywwkFghQCNcALCfO7/exec";

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
