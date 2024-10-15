// yasemin
// Select all forms with an id starting with "edit-collection-form" and add an event listener to each.
// The listener will handle form submission without reloading the page, allowing us to process the form via an API call.

document.body.addEventListener("click", (event) => {

    const targetId = event.target.id;
    const collectionId = event.target.dataset.collectionId;
    
    // Gather Collection Data and store in modal fields
    if(collectionId){

      const collectionDataElements = document.querySelectorAll(`[data-collection-id="${collectionId}"]`)

      const collectionData = {}

      for(const element of collectionDataElements){
        if(element.dataset.collectionField == 'title'){
          collectionData.title = element.innerText;
        }
        if(element.dataset.collectionField == 'description'){
          collectionData.description = element.innerText;
        }
      }

      document.getElementById('collectionTitle').value = collectionData.title;
      document.getElementById('collectionDescription').value = collectionData.description;
      document.getElementById('editCollectionForm').dataset.currentCollectionId = collectionId;
    }

    if(targetId == 'saveChangesButton'){
     
      const modalData = {
        id: document.getElementById('editCollectionForm').dataset.currentCollectionId,
        title: document.getElementById('collectionTitle').value,
        description: document.getElementById(`collectionDescription`).value
      }

      updateCollection(modalData)

    }

})

async function updateCollection(modalData){

    const response = await fetch(`/api/collection/${modalData.id}`, {
      method: 'PUT',
      body: JSON.stringify(modalData),
      headers: { 'Content-Type': 'application/json' },
    });    

    if (response.ok) {
        location.reload(); // Reload the page to reflect the changes
      } else {
        alert('Failed to update collection');
      }
}

//handles where to direct a user when the "open collection" is clicked
function openCollection(collectionId) {
  // Navigating to a new page with the collection ID
  window.location.href = `/collection/${collectionId}`;
}

// document.querySelectorAll('[id^="edit-collection-form"]').forEach(form => { 
//     form.addEventListener('submit', async(e) => {
//         e.preventDefault(); //  prevents the default form submission behavior ( e is a event object)

//         // for retrieving the form inputs (title and desription) associated with the collection being edited, so that the data can be sent in an API request.
//         const collectionId = form.getAttribute('data-current-collection-id');
//         const title = document.querySelector(`#collection-title-${collectionId}`).value;
//         const description = document.querySelector(`#collection-description-${collectionId}`).value;


//         });