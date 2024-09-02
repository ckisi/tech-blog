// login the user
const loginHandler = async (event) => {
  // prevent refresh
  event.preventDefault();

  // grab and trim user inputs
  const username = document.querySelector("#loginUsername").value.trim();
  const password = document.querySelector("#loginPassword").value.trim();

  // make POST request to login
  if (username && password) {
    const response = await fetch("api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("logged in");
      // relocate to homepage
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

// event listener for login button
document.querySelector(".login-form").addEventListener("submit", loginHandler);
