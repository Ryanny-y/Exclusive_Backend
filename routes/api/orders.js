const express = require('express');
const router = express.Router();
const { getOrders, createOrder, cancelOrder, clearOrder } = require('../../controller/api/orderController');

router.route('/')
  .get(getOrders)
  .post(createOrder)
  .delete(clearOrder)
  // .delete(cancelOrder);

module.exports = router;