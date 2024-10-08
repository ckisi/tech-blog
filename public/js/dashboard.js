// creates a post from user input
const createPost = async () => {
  // no event.preventDefault() so the page will refresh after form submission

  // grab and trim user inputs
  const title = $("#titleBox").val().trim();
  const content = $("#contentBox").val().trim();

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
  } else {
    alert("Please fill out all of the fields");
  }
};

// updates a post
const updatePost = async (postId) => {
  const title = $("#updateTitle").val().trim();
  const content = $("#updateContent").val().trim();

  if (title && content) {
    const response = await fetch(`api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Post updated");
    } else {
      alert(response.statusText);
    }
  } else {
    alert("Please fill out all of the fields")
  }
};

// deletes a post
const deletePost = async (postId) => {
  const response = await fetch(`api/posts/${postId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    location.reload();
  } else {
    alert("Failed to delete post");
  }
};

$(function () {
  // triggers when the "post" button is clicked, submitting the form
  $(".postForm").on("submit", createPost);

  // makes the update form appear when a post is clicked on, which contains the text of the post already in the boxes
  $(".post").click(function () {
    $("#updateFormCollapse").collapse("show");

    const postId = $(this).data("post-id");
    const title = $(this).find(".card-title").text();
    const content = $(this).find(".card-text").text();

    $("#updateTitle").val(title);
    $("#updateContent").val(content);

    $(".updateForm").data("post-id", postId);
  });

  // updates post when the update button is clicked
  $(".updateForm").on("submit", function () {
    const postId = $(".updateForm").data("post-id");
    updatePost(postId);
  });

  // delete post when delete button is clicked
  $("#deleteBtn").on("click", function () {
    const postId = $(".updateForm").data("post-id");
    deletePost(postId);
  });
});
