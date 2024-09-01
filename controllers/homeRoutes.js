const router = require("express").Router();
const { User, Post } = require("../models");

// render homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // serialize the data
    const posts = postData.map((post) => post.get({ plain: true }));
    
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// render dashboard page
router.get("/dashboard", (req, res) => {
  res.render("dashboard", { logged_in: req.session.logged_in });
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
