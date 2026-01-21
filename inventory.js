console.log("JS NOVO CARREGADO", new Date().toISOString());

const items = [];

const form = document.getElementById("itemForm");
const list = document.getElementById("itemsList");
const submitAllBtn = document.getElementById("submitAll");
const statusDiv = document.getElementById("status");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const type = document.getElementById("type").value;
  const client = document.getElementById("client").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const item = document.getElementById("item").value.trim();
  const description = document.getElementById("description").value.trim();
  const userEmail = document.getElementById("userEmail").value.trim();

  // ===== VALIDAÇÃO FORTE =====
  if (!date) return alert("Data obrigatória");
  if (!type) return alert("IN/OUT obrigatório");
  if (!client) return alert("Cliente obrigatório");
  if (!item) return alert("Item obrigatório");
  if (!userEmail || !userEmail.includes("@")) return alert("Email inválido");
  if (!Number.isFinite(amount) || amount <= 0) return alert("Quantidade inválida");

  items.push({
    date,
    type,
    client,
    amount,
    item,
    description,
    userEmail
  });

  const li = document.createElement("li");
  li.textContent = `${type} | ${amount} | ${item} | ${client}`;
  list.appendChild(li);

  form.reset();
});

submitAllBtn.onclick = async () => {
  if (!items.length) {
    alert("Nenhum item para enviar");
    return;
  }

  statusDiv.textContent = "Enviando...";

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbxERPok44cL5J1NnIZkM7A_RZlTHeXtLB7PVZHZhvLhawrgJ2ggI6XFt6XgqEjcrneG/exec", {
      method: "POST",
      body: JSON.stringify({ items }),
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      }
    });

    const json = await res.json();

    if (!json.success) {
      throw new Error(json.error || "Erro desconhecido");
    }

    statusDiv.textContent = "Enviado com sucesso";
    items.length = 0;
    list.innerHTML = "";

  } catch (err) {
    console.error(err);
    statusDiv.textContent = "Erro ao enviar";
  }
};
