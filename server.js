// IMPORTS
const express = require('express');
const app = express();
const connDB = require('./config/connDB');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middlewares/verifyJWT');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

// CORE MODULES
const path = require('path')
const port = process.env.port || 3500;

require('dotenv').config();

// Connect to database
connDB();

// Middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/root'));

// User Routes
app.use('/register', require('./routes/users/register'));
app.use('/auth', require('./routes/users/auth'));
app.use('/refresh', require('./routes/users/refresh'));
app.use('/logout', require('./routes/users/logout'));

// Public Routes
app.use('/products', require('./routes/api/products'));
app.use('/flashsales', require('./routes/api/flashsales'));

// Protected Routes [cart, wishlist, my account]
app.use(verifyJWT);
app.use('/cart', require('./routes/api/cart'));
app.use('/wishlist', require('./routes/api/wishlist'));

// 404 handler
app.use('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'view', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ "message": "404 Not Found!" });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

mongoose.connection.once('open', () => {
  console.log('connected to db');
  app.listen(port, () => console.log(`Server is listening to port ${port}`))
})