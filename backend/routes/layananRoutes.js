const express = require('express');
const router = express.Router();
const {
    getLayanan,
    createLayanan,
    getLayananById,
    updateLayanan,
    deleteLayanan,
} = require('../controller/layanan');
const { verifyUser } = require('../middleware/authuser');

// Routes
router.get('/', verifyUser, getLayanan);
router.get('/:uuid', verifyUser, getLayananById);
router.post('/create', verifyUser, createLayanan);
router.patch('/:uuid', verifyUser, updateLayanan);
router.delete('/:uuid', verifyUser, deleteLayanan);


module.exports = router;