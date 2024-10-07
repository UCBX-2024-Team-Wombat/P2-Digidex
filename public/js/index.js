// Globals
// ===============================
const modalHandler = new ModalHandler();
let searchTimer;
const searchTimerWaitTime = 500;

// Listeners
// ===============================
document.body.addEventListener('click', (event) => {

  const target = event.target;
  const targetId = event.target.id;
  const navId = target.dataset.navId;

  if (navId != null){
    modalHandler.openModal(navId);
  }
});

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

document.addEventListener('shown.bs.modal', () => {
  // Focus on text input if modal opened is search modal
  if (modalHandler.modalIsOpen('nav-search')){
    var searchInput = document.getElementById('search-text-input');
    searchInput.focus();
  }
})

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