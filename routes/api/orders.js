const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middlewares/verifyJWT');
const { getAllOrders, getOrders, createOrder, cancelOrder } = require('../../controller/api/orderController');

router.route('/')
  .post(verifyJWT, createOrder)
  .delete(verifyJWT, cancelOrder);

router.get('/all', verifyJWT, getAllOrders)
router.get('/:userId', verifyJWT, getOrders);
module.exports = router;