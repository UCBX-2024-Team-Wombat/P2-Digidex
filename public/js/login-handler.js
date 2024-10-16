// Listeners
// ===============================

document.body.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Query all forms on page
  const forms = document.querySelectorAll("form");

  // Create Form Id to Form data map
  const formsMap = {};

  for (const form of forms) {
    formsMap[form.id] = form;
  }

  // If queried forms includes login form
  if (Object.keys(formsMap).includes("login-form")) {
    const invalidLoginText = document.getElementById("invalid-login-text");
    const serverErrorText = document.getElementById("login-server-error-text");

    invalidLoginText.hidden = true;
    serverErrorText.hidden = true;

    const formInputs = {
      password: document.getElementById("inputPassword").value.trim(),
      email: document.getElementById("inputEmail").value.trim(),
    };

    loginResponseStatus = await handleLogin(formInputs);

    if (loginResponseStatus == 200) {
      // If successful, redirect the browser to the home page
      document.location.replace("/");
    } else if (loginResponseStatus == 500) {
      // If a server error occurs, reveal error text to notify
      serverErrorText.hidden = false;
    } else {
      // If invalid username/password, reveal error text to notify
      invalidLoginText.hidden = false;
    }
  }
});

// Functions
// ===============================

async function handleLogin(credentials) {
  // Collect values from the login form
  const { email, password } = credentials;

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });

    // Return status to caller for handling
    return response.status;
  }
}
