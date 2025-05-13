const express = require('express');
const app = express();
const port = 3000;

const productRoutes = require('./routes/product.routes');

app.use(express.json());
app.use('/products', productRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});