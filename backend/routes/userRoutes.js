const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const authLogin = require('../middleware/authlogin');

// Routes
router.post('/login', UserController.loginUser);
router.get('/get', UserController.getUsers);
router.get('/', authLogin.verifytoken, UserController.getUsers);
router.get('/:id_user', UserController.getUserById);
router.post('/', UserController.createUsers);
router.put('/:id_user', UserController.updateUsersById);
router.delete('/:id_user', UserController.deleteUsersById);
router.delete('/logout', UserController.deleteUsersById);

module.exports = router;
