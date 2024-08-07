const express = require('express');
const router = express.Router();
const handleAuth = require('../../controller/users/authController');

router.post('/', handleAuth);

module.exports = router;