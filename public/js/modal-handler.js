class ModalHandler {

  openModals = {
    'modal-search': false
  }

  navIdToModalIdMap = {
    'nav-search': 'modal-search'
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