// Listeners
// ===============================

// Click listener
document.addEventListener("click", (event) => {
  const targetId = event.target.id;

  // If clicked element is edit button, open modal
  if (targetId == "edit-card-button") {
    openCardEditModal();
  }

  // If clicked element is save button, call save function
  if (targetId == "modal-edit-card-save-changes") {
    saveCardChanges();
  }
});

// Input Listener
document.addEventListener("input", async (event) => {

  // If input field is card description in edit modal
  if (event.target.id == "modal-edit-card-description") {

    // Get parsed markdown from endpoint
    const response = await fetch("/api/card/parse-markdown", {
      method: "POST",
      body: JSON.stringify({ value: event.target.value }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(response);

    if (response.ok) {
      // If successful, set markdown to returned parsed markdown value
      const parsedResponse = await response.json();
      document.getElementById("modal-edit-card-markdown").innerHTML = parsedResponse;
    } else {
      console.log("Markdown loading error");
    }
  }
});

// Functions
// ===============================

// Save function for modal "save changes" button
async function saveCardChanges() {
  const cardData = {
    id: document.getElementById("card-id").dataset.cardId,
    title: document.getElementById("modal-edit-card-title").value,
    description: document.getElementById("modal-edit-card-description").value,
  };

  const response = await fetch(`/api/card/update/${cardData.id}`, {
    method: "POST",
    body: JSON.stringify(cardData),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    closeCardEditModal();
    window.location.replace(`/card/${cardData.id}`);
  } else {
    console.log("something went wrong");
  }
}

// Open modal function
function openCardEditModal() {
  const modalId = "modal-edit-card";
  const modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.show();
}

// Close modal function
function closeCardEditModal() {
  const modalId = "modal-edit-card";
  const modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.hide();
}
