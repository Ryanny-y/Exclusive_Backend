const express = require('express');
const router = express.Router();
const handleLogout = require('../../controller/users/logoutController');

router.get('/', handleLogout);

module.exports = router;