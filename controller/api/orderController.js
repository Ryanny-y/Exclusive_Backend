const Order = require('../../model/Orders');
const { ObjectId } = require('mongodb');

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    
    if(!orders || orders.length == 0) return res.status(204);

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getOrders = async (req, res) => {
  const { userId } = req.params;

  if(!userId) return res.status(400).json({'message': "User ID is required"}); 
  try {
    const orders = await Order.findOne({ userId }).exec();
    if(!orders) return res.status(404).json({ error: 'Orders not found!'});
    res.json(orders);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};

const createOrder = async (req, res) => {
  const { userId, order_items, subtotal, shipping_fee, total, payment_method } = req.body;

  if(!userId || !order_items || order_items.length === 0|| subtotal == null || shipping_fee == null|| total == null || !payment_method ) return res.status(400).json({error : "All Fields Are Required!"});

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
        message: "Order Created!",
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
    return res.status(500).json({ error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  const { userId, orderId }  = req.body;

  if(!userId || !orderId ) return res.status(400).json({error: "User ID and Order ID are required"});

  try {
    const order = await Order.findOne({ userId }).exec();
    const filteredOrders = order.orders.filter(order => {
      return !order._id.equals(ObjectId.createFromHexString(orderId));
    })

    order.orders = filteredOrders;
    await order.save();
    
    res.json({"message": `Order ${orderId} Deleted`})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const clearOrder = async (req, res) => {
  try {
    await Order.deleteMany({});
    res.json({"message": "All fields are deleted"})
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllOrders, getOrders, createOrder, cancelOrder, clearOrder };
