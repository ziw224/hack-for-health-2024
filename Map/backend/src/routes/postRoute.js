// postRoutes.js

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/allposts', postController.getAllPosts);
// router.get('/postId', postController.getPostById);
router.post('/post', postController.createPost);
router.put('/post', postController.updatePost);
// router.delete('/:postId', postController.deletePost);

// Add other post-related routes as needed

module.exports = router;
