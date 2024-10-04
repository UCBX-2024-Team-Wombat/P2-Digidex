const modalHandler = new ModalHandler();
let searchTimer;
const searchTimerWaitTime = 750;

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

    const keysToIgnore = [
      'Escape',
      'Enter'
    ];
  
    if (keysToIgnore.includes(event.key) == false){
      clearTimeout(searchTimer)
  
      searchTimer = setTimeout(() => {
        doneTyping(event.target.value)
      }, searchTimerWaitTime);
    }
  }
})

function doneTyping(value){
  console.log(`done typing: ${value}`)
  // Next: Send search text payload to api for query
}

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
