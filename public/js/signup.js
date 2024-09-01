// creates a new user using user input
const signupHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#createUsername").value.trim();
  const password = document.querySelector("#createPassword").value.trim();

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
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupHandler);
