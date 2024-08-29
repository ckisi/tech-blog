const router = require('express').Router();
const { Post } = require('../../models');
const authorization = require('../../utils/authorization');

router.post('/', async (req, res) => {
  try {
    
  } catch (err) {
    res.status(400).json(err);
  }
});