// login the user
const loginHandler = async (event) => {
  // prevent refresh
  event.preventDefault();

  // grab and trim user inputs
  const username = $("#loginUsername").val().trim();
  const password = $("#loginPassword").val().trim();

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
      alert("Username or password incorrect");
    }
  } else {
    alert("Please enter username and password")
  }
};

// event listener for login button
$(".login-form").on("submit", loginHandler);
