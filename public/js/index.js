// Globals
// ===============================
const modalHandler = new ModalHandler();
let searchTimer;
const searchTimerWaitTime = 500;
// Listeners
// ===============================

// Page Load Listener
document.addEventListener("DOMContentLoaded", async () => {
  const usersCollections = await fetch("/api/collection/user-collections", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  populateCollectionsSelect(await usersCollections.json());
});

// Input Listener
document.addEventListener("input", async (event) => {

  if(event.target.id == 'modal-input-new-card-description'){

    const response = await fetch('/api/card/parse-markdown', {
      method: 'POST',
      body: JSON.stringify({ value: event.target.value}),
      headers: {'Content-Type': "application/json"}
    });

    if(response.ok){
      const parsedResponse = await response.json();
      document.getElementById('modal-input-new-card-markdown').innerHTML = parsedResponse;
    }
    else {
      console.log('Markdown loading error');
    }


  }

})

// Click listener
document.body.addEventListener("click", async (event) => {
  const target = event.target;
  const targetId = event.target.id;
  const isModal = event.target.dataset.isModal;

  // Pass clicked modal launchers to modal handler
  if (isModal == "yes") {
    modalHandler.openModal(targetId);
  }

  if (
    targetId == "modal-new-collection-save" ||
    targetId == "modal-new-card-save"
  ) {
    modalHandler.getModalInputsAndFetch();
  }

  // Handle logout when logout clicked
  if (targetId == "account-dropdown-sign-out") {
    const logoutResponseCode = await handleLogout();

    if (logoutResponseCode == 204) {
      // If successful, redirect the browser to the home page
      document.location.replace("/login");
    }
  }
});

// Bootstrap show-modal event listener
document.addEventListener("shown.bs.modal", () => {
  // Focus on text input if modal opened is search modal
  if (modalHandler.currentModal == "nav-search") {
    var searchInput = document.getElementById("search-text-input");
    searchInput.focus();
  }
});

// Bootstrap hide-modal event listener
document.addEventListener("hidden.bs.modal", () => {
  // Clear values from all modal inputs on close modal event
  // if(modalHandler.modalIsOpen("nav-search")){
  //   // Reset search input
  //   const modalInputs = document.getElementById('search-text-input');
  //   modalInputs.value = null;
  //   // Reset search result columns
  //   const searchResultColumns = [
  //     document.getElementById('queried-collections'),
  //     document.getElementById('queried-cards')
  //   ];
  //   for(const column of searchResultColumns){
  //     column.innerHTML = null;
  //   }
  // }
});

// Functions
// ===============================

function populateCollectionsSelect(collections) {
  const selectElement = document.getElementById(
    "available-collections-selector"
  );

  for (const collection of collections) {
    const option = document.createElement("option");
    option.value = collection.id;
    option.innerText = collection.title;

    selectElement.appendChild(option);
  }
}
