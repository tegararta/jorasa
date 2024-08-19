const express = require('express');
const router = express.Router();
const {
    getCoresponden,
    createCoresponden,
    deleteCoresponden,
    getSaran } = require('../controller/coresponden');
const { verifyUser } = require('../middleware/authuser');

// Routes role admin
router.get('/', verifyUser, getCoresponden);
router.post('/create', createCoresponden);
router.delete('/:uuid', verifyUser, deleteCoresponden);
router.get('/saran', verifyUser, getSaran);


module.exports = router;
