
const Cart = require('../../model/Cart');

const getCartProducts = async (req, res) => {
  const { userId } = req.body;

  if(!userId) return res.status(400).json({"message": "User Id is required"})

  try {
    const cart = await Cart.findOne({userId}); 
    if(!cart) return res.status(403).jsoN({"message": "Cart not found"})
    res.json({cart})
  } catch (error) {
    res.status(500).json({"message": error.message})
  }

};

const addToCart = async (req, res) => {
  const { productId, userId } = req.body;

  if (!productId || !userId) {
    return res.status(400).json({ "message": "User Id and Product Id are required" });
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      const productIndex = cart.products.findIndex(product => product.productId === productId);

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }

      await cart.save();
      res.json({"message": "Added To Cart"});
    } else {
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity: 1 }]
      });
      res.status(201).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ "message": error.message });
  }
};


const updateToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if(!userId || !productId ) return res.status(400).json({"message": "User ID and Product ID are required"});

  try {
    const cart = await Cart.findOne({ userId });

    if(!cart) return res.status(404).json({"message" : "Cart Not Found!"});
    const productIndex = cart.products.findIndex(product => product.productId === productId);
    if(productIndex === -1) return res.status(404).json({"message": "Product Not Found!"});
    if(quantity) cart.products[productIndex].quantity = quantity;

    await cart.save();
    
    res.json({"message": `Cart Updated!`})
  } catch (error) {
    res.status(500).json({"message" : error.message})
  }

};

const deleteFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  if(!userId || !productId ) res.status(400).json({"message": "User ID and Product ID are required"});

  try {
    const cart = await Cart.findOne({ userId });
    if(!cart) res.status(400).json({"message": "Cart Not Found!"});

    const productExist = cart.products.find(product => product.productId === productId);
    if(!productExist) return res.status(400).json({"message": `Product ${productId} Not Found`});

    const filteredProducts = cart.products.filter(product => product.productId !== productId);
    cart.products = filteredProducts;
    await cart.save();

    res.json({"message": `Product ${productId} Deleted From Cart`})    
  } catch (error) {
    res.status(500).json({"message": error.message})
  }

}

module.exports = { addToCart, getCartProducts, updateToCart, deleteFromCart }