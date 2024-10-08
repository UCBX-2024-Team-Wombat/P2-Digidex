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
      
      // Return status to caller for handling
      return response.status;
    }
  };