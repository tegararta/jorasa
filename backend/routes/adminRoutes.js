const express = require('express');
const router = express.Router();
const {getUsers, getUserById, createUsers, update, deleteUsersById } = require('../controller/admin');
const { verifyUser, userAdmin } = require('../middleware/authuser');
const { updateUser, } = require('../controller/user')



// Routes role admin
router.patch('/:id_user', verifyUser, userAdmin, update);
router.get('/', verifyUser, userAdmin, getUsers);
router.get('/:id_user', verifyUser, userAdmin, getUserById);
router.post('/', verifyUser, userAdmin, createUsers);
router.delete('/:id_user', verifyUser, userAdmin, deleteUsersById);

// Routes role user
router.get('/unit/:id_user', verifyUser, updateUser);

module.exports = router;
