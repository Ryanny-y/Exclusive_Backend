const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middlewares/verifyJWT');
const { getOrders, createOrder, cancelOrder } = require('../../controller/api/orderController');

router.route('/')
  .get(verifyJWT, getOrders)
  .post(verifyJWT, createOrder)
  .delete(verifyJWT, cancelOrder);

module.exports = router;