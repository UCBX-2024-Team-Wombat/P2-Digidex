// Globals
// ===============================
const modalHandler = new ModalHandler();
let searchTimer;
const searchTimerWaitTime = 500;

// Listeners
// ===============================

// Click listener
document.body.addEventListener("click", async (event) => {
  const target = event.target;
  const targetId = event.target.id;
  const isModal = event.target.dataset.isModal;

  // Pass clicked modal launchers to modal handler
  if (isModal == "yes") {
    modalHandler.openModal(targetId);
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
  if (modalHandler.modalIsOpen("nav-search")) {
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
