require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

// import router
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');

// import middleware handle error
const errorHandler = require('./middlewares/errorHandler');

// import DB
const connectDB = require('./configs/db');

// Connect to MongoDB
connectDB();

// Global Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

// Routes
app.use('/products', productRoutes);
app.use('/auth', authRoutes);

// Error Handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});