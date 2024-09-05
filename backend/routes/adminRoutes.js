const express = require('express');
const router = express.Router();
const {getUsers, getUserById, createUsers, update, deleteUsersById } = require('../controller/admin');
const { verifyUser, userAdmin } = require('../middleware/authuser');

// Routes role admin
router.patch('/update/:uuid', verifyUser, update);
router.get('/', verifyUser, userAdmin, getUsers);
router.get('/:uuid', verifyUser, userAdmin, getUserById);
router.post('/create', verifyUser, userAdmin, createUsers);
router.delete('/:uuid', verifyUser, userAdmin, deleteUsersById);

module.exports = router;
