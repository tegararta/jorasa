const express = require('express');
const router = express.Router();
const {
    getLayanan,
    createLayanan,
    getLayananById,
} = require('../controller/layanan');
const { verifyUser } = require('../middleware/authuser');

// Routes
router.get('/', verifyUser, getLayanan);
router.get('/:uuid', verifyUser, getLayananById);
router.post('/', verifyUser, createLayanan);

module.exports = router;