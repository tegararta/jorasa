const express = require('express');
const router = express.Router();
const {
    getCoresponden,
    createCoresponden,
    deleteCoresponden,
    getBiodata,
    getSaran,
    falseSaranStatus,
    activateSaranStatus } = require('../controller/coresponden');
const { verifyUser } = require('../middleware/authuser');

// Routes role admin
router.get('/', verifyUser, getCoresponden);
router.post('/create', createCoresponden);
router.delete('/:uuid', verifyUser, deleteCoresponden);
router.get('/saran', verifyUser, getSaran);
router.get('/biores', verifyUser, getBiodata);
router.patch('/saran/status/:uuid/false', verifyUser, falseSaranStatus);
router.patch('/saran/status/:uuid/true', verifyUser, activateSaranStatus);

module.exports = router;
