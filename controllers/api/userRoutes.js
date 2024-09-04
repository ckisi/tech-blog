// /api/users

const router = require("express").Router();
const { User } = require("../../models");

// create a user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    console.log("user created");
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.save(() => {
      console.log("session made", userData.id);
      res.status(200).json(userData);
    });
    console.log("session variable:", req.session);
  } catch (err) {
    res.status(400).json(err);
  }
});

// user login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//user logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DEBUGGING REMOVE LATER: checks sessions variables
router.get("/check-session", (req, res) => {
  // Access the session variables
  // Log the session variables to the console
  console.log("User ID:", req.session.user_id);
  console.log("Is Logged In:", req.session.logged_in);

  // Send a response
  res.send("Session variables checked. Please check the console for output.");
});

module.exports = router;
