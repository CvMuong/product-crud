const Product = require('../models/Product');

exports.getAllProducts = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const total = await Product.countDocuments();
        const products = await Product.find().skip(skip).limit(limit).sort({ createdAt: -1});

        res.json({
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: products
        });
    } catch (error) {
        next(error)
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById({ _id: req.params.id });

        if (!product) {
            const error = new Error('Product not found!');
            error.status = 404;
            return next(error);
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create({
            name: req.body.name,
            price: req.body.price
        });
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                price: req.body.price
            },
            {
                new: true
            }
        );

        if (!updateProduct) {
            const error = new Error('Product not found for update!');
            error.status = 404;
            return next(error);
        }

        res.json(updateProduct);
    } catch (error) {
        next(error);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deleteProduct) {
            const error = new Error('Product not found for removal!');
            error.status = 404;
            return next(error);
        }

        res.json({ message: 'Successfully deleted!'})
    } catch (error) {
        next(error);
    }
};