const express = require('express');
const router = express.Router();

const userController = require('../Controllers/UserControllers');

//define routes for user operations
//create user
router.post('/create', userController.createUser);
//login user
router.post('/login', userController.loginUser);
//get all users
//router.get('/:id', userController.getUserById);
// Update user
//router.put('/:id', userController.updateUser);
// Delete user
//router.delete('/:id', userController.deleteUser);

// Export the router
module.exports = router;