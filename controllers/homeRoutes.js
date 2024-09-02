const router = require("express").Router();
const { User, Post } = require("../models");

// render homepage
router.get("/", async (req, res) => {
  try {
    // gets all of the posts, and includes the username of the user who created the post
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // serialize the data
    const posts = postData.map((post) => post.get({ plain: true }));

    // renders homepage.handlebars and gives it access to the serialized data and session variable
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// render dashboard page
router.get("/dashboard", async (req, res) => {
  try {
    // gets all posts that were created by the currently logged in user
    if (req.session.logged_in) {
      const postData = await Post.findAll({
        where: { user_id: req.session.user_id },
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      res.render("dashboard", {
        logged_in: req.session.logged_in,
        posts: posts,
      });
    } else {
      // if the user is not logged in, it will redirect to login page
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// render login page
router.get("/login", (req, res) => {
  res.render("login");
});

// render signup page
router.get("/signup", async (req, res) => {
  res.render("signup");
});

module.exports = router;
