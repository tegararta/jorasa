const express = require('express');
const router = express.Router();
const {getUsers, getUserById, getUnit, createUsers, update, deleteUsersById } = require('../controller/admin');
const { verifyUser, userAdmin } = require('../middleware/authuser');
const { updateUser, } = require('../controller/user')



// Routes role admin
router.patch('/:uuid', verifyUser, userAdmin, update);
router.get('/', verifyUser, userAdmin, getUsers);
router.get('/unit', verifyUser, userAdmin, getUnit);
router.get('/:uuid', verifyUser, userAdmin, getUserById);
router.post('/create', createUsers);
router.delete('/:uuid', verifyUser, userAdmin, deleteUsersById);

// Routes role user
router.get('/unit/:id_user', verifyUser, updateUser);

module.exports = router;
