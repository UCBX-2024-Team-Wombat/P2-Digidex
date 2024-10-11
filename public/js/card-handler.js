// Listeners
// ===============================
document.addEventListener('click', (event) => {

  const targetId = event.target.id;

  // If clicked element is edit button, open modal
  if(targetId == 'edit-card-button'){
    openCardEditModal();
  }

  // If clicked element is save button, call save function
  if(targetId == 'modal-edit-card-save-changes'){
    saveCardChanges();
  }
})

// Functions
// ===============================

// Save function for modal "save changes" button
async function saveCardChanges(){

  const cardData = {
    id: document.getElementById('card-id').dataset.cardId,
    title: document.getElementById('modal-edit-card-title').value,
    description: document.getElementById('modal-edit-card-description').value
  };

  const response = await fetch(`/api/card/update/${cardData.id}`, {
    method: "POST",
    body: JSON.stringify(cardData),
    headers: { "Content-Type": "application/json" },
  });

  if(response.ok){
    closeCardEditModal();
    window.location.replace(`/card/${cardData.id}`);
  }
  else {
    console.log('something went wrong');
  }
}

// Open modal function
function openCardEditModal(){    
  const modalId = 'modal-edit-card';
  const modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.show();
}

// Close modal function
function closeCardEditModal(){
  const modalId = 'modal-edit-card';
  const modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.hide();
}
