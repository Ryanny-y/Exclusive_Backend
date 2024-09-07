const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middlewares/verifyJWT');
const { updateUser } = require('../../controller/users/userController');

router.patch("/:userId", verifyJWT, updateUser);

module.exports = router;