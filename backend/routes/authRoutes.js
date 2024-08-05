const express = require('express');
const router = express.Router();
const authLogin = require('../controller/authlogin');

// Routes
router.get('/userOn', authLogin.userOn);
router.post('/login', authLogin.login);
router.delete('/:logout', authLogin.logout);

module.exports = router;