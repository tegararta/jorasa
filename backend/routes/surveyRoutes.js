const express = require('express');
const router = express.Router();
const {
    getSurvey,
    createSurvey,
    update,
    getSurveyuuid,
    deleteSurvey,
} = require('../controller/survey');
const { verifyUser } = require('../middleware/authuser');

// Routes
router.get('/', verifyUser, getSurvey);
router.post('/create', verifyUser, createSurvey);
router.patch('/:uuid', verifyUser, update);
router.get('/:uuid', getSurveyuuid);
router.delete('/delete/:uuid', verifyUser, deleteSurvey);

module.exports = router;