
const navHandlerMap = {
  search: showSearchModal
}


// Listeners
// ===============================
document.body.addEventListener('click', (event) => {

  const target = event.target;
  const targetId = event.target.id;

  if (target.dataset.navId != null){
    const navId = target.dataset.navId;

    if(Object.keys(navHandlerMap).includes(navId)){
      navHandlerMap[navId]();
    }

  }
});


// Functions
// ===============================

function showSearchModal(){
  var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
    keyboard: false
  })

  myModal.show();
}