console.log("JS carregado");

document.getElementById("submitBtn").addEventListener("click", async () => {
  const payload = {
    user_email: document.getElementById("user_email").value,
    type: document.getElementById("type").value,
    client: document.getElementById("client").value,
    amount: document.getElementById("amount").value,
    item: document.getElementById("item").value,
    description: document.getElementById("description").value
  };

  document.getElementById("status").innerText = "Sending...";

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzAqDDnvYwaPyy6HAVLOsIALtwucv8MXs7q8yeQoNYDzEn5YKci_hiufqGcZdcHJQWY/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const result = await response.json();

    if (result.success) {
      document.getElementById("status").innerText = "Submitted successfully";
    } else {
      document.getElementById("status").innerText = "Backend error";
      console.error(result.error);
    }

  } catch (err) {
    document.getElementById("status").innerText = "Request failed";
    console.error(err);
  }
});
