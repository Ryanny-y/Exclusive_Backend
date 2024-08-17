const Order = require('../../model/Orders');

const getOrders = async (req, res) => {
  const { userId } = req.params;

  if(!userId) return res.status(400).json({'message': "User ID is required"}); 
  try {
    const orders = await Order.findOne({ userId }).exec();
    if(!cart) return res.status(404).json({"message": 'Orders not found!'});
    res.json(orders);
  } catch (error) {
    res.status(500).json({'message': error.message})
  }

};

const createOrder = async (req, res) => {
  const { userId, order_items, subtotal, shipping_fee, total, payment_method } = req.body;

  if(!userId || !order_items || order_items.length === 0|| subtotal == null || shipping_fee == null|| total == null || !payment_method ) return res.status(400).json({"message" : "All Fields Are Required!"});

  try {
    const order = await Order.findOne({ userId }).exec();

    const order_details = {
      order_items,
      subtotal,
      shipping_fee,
      total,
      payment_method
    }

    if(order) {
      order.orders.push(order_details);
      await order.save();
      res.status(201).json({
        message: "order created!",
        order: order_details
      })
    } else {
      const newOrder = await Order.create({
        userId,
        orders: [order_details]
      });
      res.status(201).json({
        message: "new order created!",
        order: newOrder
      })
    }
  } catch (error) {
    console.log(error.message);
  }
};

const cancelOrder = async (req, res) => {

};

const clearOrder = async (req, res) => {
  try {
    await Order.deleteMany({});
    res.json({"message": "All fields are deleted"})
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getOrders, createOrder, cancelOrder, clearOrder };