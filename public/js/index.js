// Globals
// ===============================
const modalHandler = new ModalHandler();
let searchTimer;
const searchTimerWaitTime = 500;

// Placeholder logout function for testing - to delete
// ==================================================
async function logout(){
  await fetch('/api/user/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
// ==================================================

// Listeners
// ===============================

// Click listener
document.body.addEventListener('click', (event) => {

  const target = event.target;
  const targetId = event.target.id;
  const isModal = event.target.dataset.isModal;  

  // Pass clicked modal launchers to modal handler
  if (isModal == 'yes'){
    modalHandler.openModal(targetId);
  }

  // Handle logout when logout clicked
  if (targetId == 'account-dropdown-sign-out'){
    handleLogout()
  }

});

document.body.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Query all forms on page
  const forms = document.querySelectorAll('form');

  // Create Form Id to Form data map
  const formsMap = {}

  for(const form of forms){
    formsMap[form.id] = form;
  }

  // If queried forms includes login form
  if(Object.keys(formsMap).includes('login-form')){

    const invalidLoginText = document.getElementById('invalid-login-text');
    const serverErrorText = document.getElementById('login-server-error-text');

    invalidLoginText.hidden = true;
    serverErrorText.hidden = true;

    const formInputs = {
      password: document.getElementById('inputPassword').value.trim(),
      email: document.getElementById('inputEmail').value.trim()
    }

    loginResponseStatus = await handleLogin(formInputs);

    if(loginResponseStatus == 200){
      // If successful, redirect the browser to the home page
      document.location.replace('/');
    }
    else if(loginResponseStatus == 500){
      // If a server error occurs, reveal error text to notify
      serverErrorText.hidden = false;
    }
    else {
      // If invalid username/password, reveal error text to notify
      invalidLoginText.hidden = false;
    }
  }
})

// Keydown listener
document.body.addEventListener('keydown', (event) => {

  // Handle search text completion
  if (event.target.id == 'search-text-input'){

    // Set keys to not consider in keydown for search text
    const keysToIgnore = [
      'Escape',
      'Enter'
    ];
    
    if (keysToIgnore.includes(event.key) == false){
      clearTimeout(searchTimer) // Clear any existing timeouts from prior keydowns
  
      searchTimer = setTimeout(() => { // Set global searchTimer to timeout from setTimeout()
        querySearchText(event.target.value) // When timeout complete, send entered text to search API
      }, searchTimerWaitTime); // Wait time designated in global searchTimerWaitTime before running function
    }
  }
})

// Bootstrap show-modal event listener
document.addEventListener('shown.bs.modal', () => {
  // Focus on text input if modal opened is search modal
  if (modalHandler.modalIsOpen('nav-search')){
    var searchInput = document.getElementById('search-text-input');
    searchInput.focus();
  }
})

// Bootstrap hide-modal event listener
document.addEventListener('hidden.bs.modal', () => {

  // Clear values from all modal inputs on close modal event
  const modalInputs = document.querySelectorAll('input');

  for(const input of modalInputs){
    input.value = null;
  }
})

// Functions
// ===============================

// Queries passed string data to Card and Collection endpoints 
function querySearchText(value){
  typedValues = value.split(' ')
  console.log(typedValues)
  // Next: Send search text payload to api for query
}

function handleLogout(){
  console.log(`"logging out"`);
  
  // Pending login functionality established
}