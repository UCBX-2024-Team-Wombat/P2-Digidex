class ModalHandler {

  openModals = {
    'modal-search': false,
    'modal-new-collection': false,
    'modal-new-card': false
  }

  inputs = {}

  navIdToModalIdMap = {
    'nav-search': 'modal-search',
    'nav-new-collection': 'modal-new-collection',
    'nav-new-card': 'modal-new-card'
  }

  async getModalInputsAndFetch(){

    let tableName = this.currentModal.split('-').at(-1);

    const newRecordData = {
      title: document.getElementById(`modal-input-new-${tableName}-title`).value,
      description: document.getElementById(`modal-input-new-${tableName}-description`).value
    }

    if(tableName == 'collection'){
      const response = await fetch('/api/collection/new', {
        method: "POST",
        body: JSON.stringify(newRecordData),
        headers: { "Content-Type": "application/json" }
      })

      if(response.ok){
        location.reload();
      }
      else {
        alert('error!');
      }
    }

    if(tableName == 'card'){
      // newRecordData.

      const newCardResponse = await fetch('/api/card/new', {
        method: "POST",
        body: JSON.stringify(newRecordData),
        headers: { "Content-Type": "application/json" }
      })

      if(newCardResponse.ok){
        const parsedResponse = await newCardResponse.json();
        console.log('==========PARSED CARD RESPONSE============')
        console.log(parsedResponse);
        
        console.log('======================')
        const cardToCollectionData = {
          collectionId: document.getElementById('available-collections-selector').value,
          cardId: parsedResponse.id
        }

        console.log('=======CARD TO COLLECTION DATA=======')
        console.log(cardToCollectionData)
        console.log('==============')

        const newJunctionResponse = await fetch('/api/card-to-collection/new', {
          method: "POST",
          body: JSON.stringify(cardToCollectionData),
          headers: { "Content-Type": "application/json" }
        })

        if(newJunctionResponse.ok){
          location.reload();
        }
        else {
          console.log('junction error');
        }
      }
      else {
        alert('error!');
      }
    }

  }

  get currentModal() {
    for(const modalKey of Object.keys(this.openModals)){
      if (this.openModals[modalKey] == true){
        return modalKey;
      }
    }
  }

  modalIsOpen(navId){    
    return this.openModals[this.navIdToModalIdMap[navId]];
  }

  openModal(navId){    
    const modalId = this.navIdToModalIdMap[navId];
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();
    this.openModals[modalId] = true;
  }

  closeModal(navId){
    const modalId = this.navIdToModalIdMap[navId];
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.hide();
    this.openModals[modalId] = false;
  }
}


/*
console.log("Connected ...");
const handler = new ModalHandler();

const modalBtn = document.getElementById('edit-modal');
modalBtn.addEventListener('click', function(event) {
  console.log("This: ", this);
  console.log("data: ", this.dataset);
  let selectedId = this.dataset.id;
  handler.openModal(selectedId);
});

*/