console.log("JS NOVO CARREGADO", new Date().toISOString());


const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxAo07FlZnri9obgio0VLB55_1szlmnXkndObJI52t73kGv0Crmgp2rENNgY-gU19B1/exec";

const items = [];

document.getElementById("addItem").onclick = () => {
  const item = itemEl().value.trim();
  const amount = Number(amountEl().value);
  const description = descEl().value.trim();

  if (!item || amount <= 0) return;

  items.push({ item, amount, description });
  render();

  itemEl().value = "";
  amountEl().value = "";
  descEl().value = "";
};

document.getElementById("submitAll").onclick = async () => {
  if (!items.length) return;

  const payload = {
    user_email: emailEl().value.trim(),
    type: typeEl().value,
    client: clientEl().value.trim(),
    items
  };

  statusEl().innerText = "Sending...";

  const formData = new URLSearchParams();
formData.append("data", JSON.stringify(payload));

const res = await fetch(SCRIPT_URL, {
  method: "POST",
  body: formData
});


  const json = await res.json();

  statusEl().innerText = json.success ? "Done" : json.error;
  if (json.success) items.length = 0;
  render();
};

function render() {
  listEl().innerHTML = "";
  items.forEach(i => {
    const li = document.createElement("li");
    li.textContent = `${i.amount}x - ${i.item}`;
    listEl().appendChild(li);
  });
}

const emailEl = () => document.getElementById("userEmail");
const typeEl = () => document.getElementById("type");
const clientEl = () => document.getElementById("client");
const itemEl = () => document.getElementById("item");
const amountEl = () => document.getElementById("amount");
const descEl = () => document.getElementById("description");
const listEl = () => document.getElementById("itemsList");
const statusEl = () => document.getElementById("status");
