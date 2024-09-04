// creates a new user using user input
const signupHandler = async (event) => {
  event.preventDefault();

  const username = $("#createUsername").val().trim();
  const password = $("#createPassword").val().trim();

  if (username && password) {
    const response = await fetch("api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // relocate user to homepage
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

// event listener for sign up button
$(".signup-form").on("submit", signupHandler);
