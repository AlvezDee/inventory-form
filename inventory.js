const API_URL = "https://script.google.com/macros/s/AKfycbylSCOH-YMEOiXnc1tSlY3RIsgSafUxt8Q21LmL5X8Cb_FFGU56FQ-sLi_bplO461wA/exec";

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
