const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserControllers');

//define routes for user operations
router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);