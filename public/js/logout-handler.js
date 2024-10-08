async function handleLogout() {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.status;
}
