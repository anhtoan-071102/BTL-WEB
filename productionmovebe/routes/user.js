const express = require('express');

const uploadImage = require('../utils/multer').uploadImage('users');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/get-users', userController.getUsers);

router.get('/get-all-id', userController.getUserIds);

router.get('/get-user/:userId', userController.getUser);

router.post('/add-user', uploadImage, userController.addUser);

router.put('/edit-user/:userId', userController.editUser);

router.put('/edit-user-image/:userId', userController.editUserImage);

// router.put('/edit-password/:userId', )

module.exports = router;
