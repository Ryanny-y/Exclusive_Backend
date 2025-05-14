const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middlewares/verifyJWT');
const { updateUser, getAllUser } = require('../../controller/users/userController');

router.get('/all', verifyJWT, getAllUser)
router.patch("/:userId", verifyJWT, updateUser);

module.exports = router;