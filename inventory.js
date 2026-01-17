console.log("JS carregado");

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submitBtn");
  const statusEl = document.getElementById("status");

  if (!submitBtn) {
    console.error("submitBtn not found");
    return;
  }

  submitBtn.addEventListener("click", async () => {
    const payload = {
      user_email: document.getElementById("user_email").value,
      type: document.getElementById("type").value,
      client: document.getElementById("client").value,
      amount: document.getElementById("amount").value,
      item: document.getElementById("item").value,
      description: document.getElementById("description").value
    };

    statusEl.innerText = "Sending...";

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
        statusEl.innerText = "Submitted successfully";
      } else {
        statusEl.innerText = "Backend error";
        console.error(result.error);
      }

    } catch (err) {
      statusEl.innerText = "Request failed";
      console.error(err);
    }
  });
});
