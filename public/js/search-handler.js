// Queries passed string data to Card and Collection endpoints
async function querySearchText(value) {
  const searchPayload = {
    fullString: value,
    parsedWords: value.split(" "),
  };

  const response = await fetch("/api/collection/search", {
    method: "POST",
    body: JSON.stringify(searchPayload),
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
}
