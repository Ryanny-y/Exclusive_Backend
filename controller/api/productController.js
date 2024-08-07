const Product = require('../../model/Products');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if(products.length <= 0) return res.status(400).json({"message": "No Products to display."})
    res.json(products)
  } catch (error) {
    res.status(500).json({"message": error.message})
  }
};

const createNewProduct = async (req, res) => {
  const { name, description, image, price, stock_quantity, ratings, category, keywords, colors, size } = req.body;
  if(!name || !description || !image || !price || !stock_quantity || !ratings || !category || !keywords ) return res.status(400).json({"message" : "All Fields are required."})

  try {
    const newProduct = await Product.create({
      name, 
      description,
      image,
      price,
      stock_quantity,
      ratings,
      category,
      keywords,
      colors,
      size
    });
    
    res.status(201).json({"message": `Product ${newProduct.name} created`});
  } catch (error) {
    res.status(500).json({"message": error.message});
  }
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  if(!id) return res.status(400).json({"message": "ID is required!"});
  try {
    const product = await Product.findOne({ _id: id }).exec();
    if(!product) return res.status(400).json({"message": `Product ID ${id} Not Found.`});
    res.json(product);
  } catch (error) {
    res.status(500).json({"message": error.message})
  }
};` `

module.exports = { getAllProducts, createNewProduct, getSingleProduct };