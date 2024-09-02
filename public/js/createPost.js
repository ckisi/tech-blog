const createPost = async () => {
  // no event.preventDefault() so the page will refresh after form submission

  // grab and trim user inputs
  const title = document.querySelector("#titleBox").value.trim();
  const content = document.querySelector("#contentBox").value.trim();

  // POST request on api/posts to add a post to the database
  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Post created");
    } else {
      alert(response.statusText);
    }
  }
};

// triggers when the "post" button is clicked, submitting the form
document.querySelector(".postForm").addEventListener("submit", createPost);
