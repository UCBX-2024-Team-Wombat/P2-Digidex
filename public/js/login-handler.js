async function handleLogin(credentials) {
    // Collect values from the login form
    const { email, password } = credentials;
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });
  
      const responseParsed = await response.json()

      if (responseParsed.loginSuccessful == true) {
        // If successful, redirect the browser to the home page
        document.location.replace('/homepage');
      } else {
        alert(responseParsed.message);
      }
    }
  };