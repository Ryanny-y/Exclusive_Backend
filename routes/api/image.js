const express = require('express');
const router = express.Router();
const path = require('path')

router.get('/:image', (req, res) => {
  const { image } = req.params;
  res.sendFile(path.join(__dirname, '..', '..', 'images', 'products', image))
});

module.exports = router;