const express = require('express');
const router = express.Router();
const {
    getSurvey,
    getUserById,
    createSurvey,
    update,
    deleteSurveyById,
} = require('../controller/survey');
const { verifyUser } = require('../middleware/authuser');

// Routes
router.get('/', verifyUser, getSurvey);
router.post('/create', verifyUser, createSurvey);
router.patch('/:id_unit', verifyUser, update);

module.exports = router;