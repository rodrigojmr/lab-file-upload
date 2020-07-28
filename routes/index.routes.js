const express = require('express');
const router = express.Router();

const Post = require('../models/Post.model');

/* GET home page */
router.get('/', (req, res) => {
  Post.find().then(posts => {
    console.log(posts);
    res.render('index', { title: 'App created with Ironhack generator 🚀', posts: posts });
  });
});

module.exports = router;
