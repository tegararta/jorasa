const express = require('express');
const router = express.Router();
const {
    getSurvey,
    createSurvey,
    update,
    deleteSurveyById,
} = require('../controller/survey');
const { verifyUser } = require('../middleware/authuser');

// Routes
router.get('/', verifyUser, getSurvey);
router.post('/create', verifyUser, createSurvey);
router.patch('/:uuid', verifyUser, update);
router.delete('/:uuid', verifyUser, deleteSurveyById);

module.exports = router;