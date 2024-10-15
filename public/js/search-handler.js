// Listeners
// ===============================

// Keydown listener
document.body.addEventListener("keydown", (event) => {
  // Handle search text completion
  if (event.target.id == "search-text-input") {
    // Set keys to not consider in keydown for search text
    const keysToIgnore = [
      "Escape",
      "Enter",
      "ArrowDown",
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "Alt",
      "Tab",
      "CapsLock",
      "Shift",
      "Control",
      "Meta",
      "NumLock",
    ];

    if (keysToIgnore.includes(event.key) == false) {
      clearTimeout(searchTimer); // Clear any existing timeouts from prior keydowns

      searchTimer = setTimeout(async () => { // Set global searchTimer to timeout from setTimeout()
        // When timeout complete, send entered text to search API
        
        // Send searched text to collection search endpoint
        const queriedCollections = await queryFromSearchText(event.target.value, "collections");
        document.getElementById('queried-collections-header').innerText = `Collections (${queriedCollections.length})`
        // Populate search page with results 
        populateSearchResults(queriedCollections, 'collections');
        
        // Send searched text to cards endpoint
        const queriedCards = await queryFromSearchText(event.target.value, "cards");
        document.getElementById('queried-cards-header').innerText = `Cards (${queriedCards.length})`
        // Populate search page with results 
        populateSearchResults(queriedCards, 'cards');
      }, searchTimerWaitTime); // Wait time designated in global searchTimerWaitTime before running function
    }
  }
});


// Functions
// ===============================

function populateSearchResults(data, tableType) {
  let modalElementToPopulate;

  if (tableType == "cards") {
    modalElementToPopulate = document.getElementById("queried-cards");
  } else if (tableType == "collections") {
    modalElementToPopulate = document.getElementById("queried-collections");
  }

  modalElementToPopulate.innerHTML = null;

  const tiles = data.map((record) => {
    return createTile(record, tableType);
  });

  for (const tile of tiles) {
    modalElementToPopulate.appendChild(tile);
  }
}

function createTile(record, tableType) {
  const anchorWrapper = document.createElement("a");
  const isCard = tableType == 'cards';
  const isCollection = tableType == 'collections';
  
  if(isCard){
    anchorWrapper.href = `/card/${record.id}`;
  }
  else if(isCollection){
    anchorWrapper.href = `/collection/${record.id}`;
  }

  anchorWrapper.classList = 'search-tile';

  // Create Card wrapper div
  const cardWrapperDiv = document.createElement("div");
  cardWrapperDiv.classList = "card mb-3";

  // Create card body (holds title and text)
  const cardBody = document.createElement("div");
  cardBody.classList = "card-body";

  // Creat card title
  const cardTitle = document.createElement("h6");
  cardTitle.classList = "card-title";
  cardTitle.innerText = record.title;

  // Create card text
  const cardText = document.createElement("div");
  cardText.classList = "card-text search-tile-body";
  
  if(isCard){
    cardText.innerHTML = record.markdown_description;
  }
  else if(isCollection){
    cardText.innerText = record.description;
  }

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);

  cardWrapperDiv.appendChild(cardBody);

  anchorWrapper.appendChild(cardWrapperDiv);

  return anchorWrapper;
  // if(type == 'card'){
  // ADD COLLECTION NAME AS SUBTITLE
  // }
}

// Queries passed string data to Cards / Collection endpoints
async function queryFromSearchText(value, tableType) {
  const searchPayload = {
    fullString: value.trim(),
    parsedWords: value.split(" ").map(val => val.trim()),
  };
  
  // Return empty array if search string is empty
  if(searchPayload.fullString == ""){
    return [];
  }

  // Set API path based on passed tableType
  let apiPath;
  
  if(tableType == 'cards'){
    apiPath = "/api/card/search";
  }
  else if (tableType == 'collections'){
    apiPath = "/api/collection/search"
  }

  // Make callout
  const response = await fetch(apiPath, {
    method: "POST",
    body: JSON.stringify(searchPayload),
    headers: { "Content-Type": "application/json" },
  });

  // Load response body and return
  const parsedResponse = await response.json();

  return parsedResponse;
}