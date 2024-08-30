const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {

});

router.get('/', async (req, res) => {

});

router.get('/', async (req, res) => {

});

module.exports = router;