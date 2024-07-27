const express = require('express');
const { refreshToken } = require('../controller/refreshToken');
const router = express.Router();

router.get('/', refreshToken);

module.exports = router;