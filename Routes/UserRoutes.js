const express = require('express');
const router = express.Router();

const userController = require('../Controllers/UserControllers');

//define routes for user operations
//create user
router.post('/create', userController.createUser);
//login user
router.post('/login', userController.loginUser);

// Export the router
module.exports = router;