const Flashsale = require('../../model/FlashSaleProduct');

const getProducts = async (req, res) => {
  try {
    const products = await Flashsale.find().sort({ name: 1});
    if(products.length <= 0) return res.status(400).json({"message": "No Products to Get"})
    res.json(products)
  } catch (error) {
    res.status(500).json({"message": error.message})
  }
}

const createProduct = async (req, res) => {
  const { name, description, images, stock_quantity, price, discount, ratings, size } = req.body;
  if(!name, !description, !stock_quantity, !price ) return res.json({"message": "All Fields are required."});
  try {
    const newProduct = await Flashsale.create({
      name,
      description,
      images,
      stock_quantity,
      price,
      discount,
      ratings,
      size
    });
    
    res.status(201).json({"message": `Product ${name} created!`})
  } catch (error) {
    res.status(500).json({"message": error.message})
  }
}

module.exports = {getProducts, createProduct};