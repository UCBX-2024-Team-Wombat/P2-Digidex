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
  console.log("create tile record: ", record)
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