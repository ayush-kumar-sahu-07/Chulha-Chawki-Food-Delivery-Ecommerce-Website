const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
let authRoutes, productRoutes, cartRoutes, orderRoutes, paymentRoutes;
try {
  authRoutes = require('./routes/auth');
  productRoutes = require('./routes/products');
  cartRoutes = require('./routes/cart');
  orderRoutes = require('./routes/orders');
  paymentRoutes = require('./routes/payment');
} catch (error) {
  console.error('Error loading routes:', error.message);
  process.exit(1);
}

dotenv.config();
console.log('Environment loaded');
const app = express();
console.log('Express app created');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files
console.log('Middleware set up');

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/foodDeliveryDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  console.log('Server starting without database connection. Please ensure MongoDB is running.');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Serve frontend
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../public/index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;
console.log('Starting server on port:', PORT);
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));