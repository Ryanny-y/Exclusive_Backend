const express = require('express');
const router = express.Router();
const handleNewUser = require('../../controller/users/registerController');

router.post('/', handleNewUser);

module.exports = router;