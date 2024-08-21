const express = require('express');
const router = express.Router();
const {
    getUnit,
    updateUnit,
} = require('../controller/unitkerja');
const { verifyUser, userAdmin } = require('../middleware/authuser');

// Routes
router.get('/', verifyUser, getUnit);
router.patch('/:id_unit', verifyUser, updateUnit);

module.exports = router;