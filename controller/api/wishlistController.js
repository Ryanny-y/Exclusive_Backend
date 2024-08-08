const Wishlist = require('../../model/Wishlist');

const getWishlistProducts = async (req, res) => {
  const { userId } = req.body;

  if(!userId) return res.status(400).json({"message": "User ID is required"})

  try {
    const wishlist = await Wishlist.findOne({ userId });
    if(!wishlist) return res.status(400).json({"message": "Wishlist not found"});
    
    res.json(wishlist)
  } catch (error) {
    res.status(500).json({"message": error.message})
  }
};

const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  if(!userId || !productId) return res.status(400).json({"message": "User ID and Product ID are required"});
  try {
   const wishlist = await Wishlist.findOne({ userId });
   if(wishlist) {
    const product = wishlist.products.find(product => product.productId === productId);
    if(product) return res.status(200).json({"message":`Product ${productId} already on wishlist`});
    wishlist.products.push({ productId });
    await wishlist.save();

    res.json(wishlist);
   } else {
    const newWishlist = await Wishlist.create({
      userId,
      products: [ productId ]
    })
    res.status(201).json(newWishlist)
   }
  } catch (error) {
    res.status(500).json({"message": error.message})
  }
};

const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  if(!userId || !productId ) return res.status(400).json({"message": "User ID and product ID are required"});

  try {
    const wishlist = await Wishlist.findOne({userId});
    if(!wishlist) return res.status(400).json({"message": "Wishlist Not Found"});
    const product = wishlist.products.find(product => product.productId === productId);
    if(!product) return res.status(400).json({"message": `Product ${productId} Not Found`});

    const filteredProducts = wishlist.products.filter(product => product.productId !== productId);
    wishlist.products = filteredProducts;
    await wishlist.save();
    
    res.json({"message": `Product ${productId } deleted from wishlist`})
  } catch (error) {
    res.status(500).json({"message": error.message})
  }

};

module.exports = { getWishlistProducts, addToWishlist, removeFromWishlist}