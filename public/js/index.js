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

document.body.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Query all forms on page
  const forms = document.querySelectorAll("form");

  // Create Form Id to Form data map
  const formsMap = {};

  for (const form of forms) {
    formsMap[form.id] = form;
  }

  // If queried forms includes login form
  if (Object.keys(formsMap).includes("login-form")) {
    const invalidLoginText = document.getElementById("invalid-login-text");
    const serverErrorText = document.getElementById("login-server-error-text");

    invalidLoginText.hidden = true;
    serverErrorText.hidden = true;

    const formInputs = {
      password: document.getElementById("inputPassword").value.trim(),
      email: document.getElementById("inputEmail").value.trim(),
    };

    loginResponseStatus = await handleLogin(formInputs);

    if (loginResponseStatus == 200) {
      // If successful, redirect the browser to the home page
      document.location.replace("/");
    } else if (loginResponseStatus == 500) {
      // If a server error occurs, reveal error text to notify
      serverErrorText.hidden = false;
    } else {
      // If invalid username/password, reveal error text to notify
      invalidLoginText.hidden = false;
    }
  }
});

// Keydown listener
document.body.addEventListener("keydown", (event) => {
  // Handle search text completion
  if (event.target.id == "search-text-input") {
    // Set keys to not consider in keydown for search text
    const keysToIgnore = [
      "Escape",
      "Enter",
      "ArrowDown",
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "Alt",
      "Tab",
      "CapsLock",
      "Shift",
      "Control",
      "Meta",
      "NumLock",
    ];

    if (keysToIgnore.includes(event.key) == false) {
      clearTimeout(searchTimer); // Clear any existing timeouts from prior keydowns

      searchTimer = setTimeout(async () => { // Set global searchTimer to timeout from setTimeout()
        // When timeout complete, send entered text to search API
        
        // Send searched text to collection search endpoint
        const queriedCollections = await queryFromSearchText(event.target.value, "collections");
        // Populate search page with results 
        populateSearchResults(queriedCollections, 'collections');
        
        // Send searched text to cards endpoint
        const queriedCards = await queryFromSearchText(event.target.value, "cards");
        // Populate search page with results 
        populateSearchResults(queriedCards, 'cards');
      }, searchTimerWaitTime); // Wait time designated in global searchTimerWaitTime before running function
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
  const modalInputs = document.querySelectorAll("input");

  for (const input of modalInputs) {
    input.value = null;
  }
});

// Functions
// ===============================
