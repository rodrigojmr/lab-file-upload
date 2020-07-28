const { Router } = require('express');
const router = new Router();

const Post = require('../models/Post.model');
const mongoose = require('mongoose');

const routeGuard = require('../configs/route-guard.config');

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});
const upload = multer({ storage });

router.get('/create', routeGuard, (req, res) => {
  res.render('posts/create');
});

router.post('/create', routeGuard, upload.single('image'), (req, res, next) => {
  const { content, imageName } = req.body;
  const url = req.file.path;
  const id = req.session.currentUser._id;
  Post.create({
    content,
    picPath: url,
    picName: imageName,
    creatorId: id
  })
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Post.findById(id)
    .populate('creatorId')
    .then(post => {
      res.render('posts/detail', { post: post });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
