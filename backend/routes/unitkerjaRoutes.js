const express = require('express');
const router = express.Router();
const {
    getUnit,
} = require('../controller/unitkerja');
const { verifyUser } = require('../middleware/authuser');

// Routes
router.get('/', verifyUser, getUnit);

module.exports = router;