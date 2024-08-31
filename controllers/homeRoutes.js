const router = require("express").Router();
const { User, Post } = require("../models");

// render homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();

    res.render("homepage");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {});

router.get("/", async (req, res) => {});

// render dashboard page
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
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
