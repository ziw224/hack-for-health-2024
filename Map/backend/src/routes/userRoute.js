// signRoutes.js

const express = require('express');
const router = express.Router();
const postController = require('../controllers/userController');

router.get('/', signController.init);
router.post('/:login', signController.login);
router.post('/:signup', postController.signup);
router.put('/:profile', postController.updateProfile);
router.get('/:profile/userId', postController.getProfile);I

// Add other post-related routes as needed

module.exports = router;
