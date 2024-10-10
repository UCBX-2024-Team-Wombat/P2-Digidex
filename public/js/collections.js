// yasemin
// Select all forms with an id starting with "edit-collection-form" and add an event listener to each.
// The listener will handle form submission without reloading the page, allowing us to process the form via an API call.

document.querySelectorAll('[id^="edit-collection-form"]').forEach(form => { 
    form.addEventListener('submit', async(e) => {
        e.preventDefault(); //  prevents the default form submission behavior ( e is a event object)

        // for retrieving the form inputs (title and desription) associated with the collection being edited, so that the data can be sent in an API request.
        const collectionId = form.getAttribute('data-collection-id');
        const title = document.querySelector(`#collection-title-${collectionId}`).value;
        const description = document.querySelector(`#collection-description-${collectionId}`).value;

        


    }
)
}
)