const express = require('express');
const { refreshToken } = require('../controller/refreshtoken');
const router = express.Router();

router.get('/', refreshToken);

module.exports = router;