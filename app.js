const express = require('express');
const app = express();
const port = 3000;
const productRoutes = require('./routes/product.routes');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./configs/db');

connectDB();

app.use(express.json());
app.use('/products', productRoutes);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});