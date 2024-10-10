// yasemin
// Select all forms with an id starting with "edit-collection-form" and add an event listener to each.
// The listener will handle form submission without reloading the page, allowing us to process the form via an API call.

document.querySelectorAll('[id^="edit-collection-form"]').forEach(form => { 
    form.addEventListener('submit', async(e) => {
        e.preventDefault();



    }
)
}
)