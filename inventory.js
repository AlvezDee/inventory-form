const API_URL = "COLE_AQUI_SUA_URL_DO_APPS_SCRIPT";

document.getElementById("submitAll").onclick = async () => {
  const items = [];

  document.querySelectorAll(".item").forEach(div => {
    items.push({
      name: div.querySelector(".name").value,
      quantity: div.querySelector(".quantity").value,
      location: div.querySelector(".location").value
    });
  });

  if (!items.length) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(items)
  });

  alert("Dados enviados com sucesso");
};
