const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const validateProduct = require('../middlewares/validateProduct');
const { productValidationRules, validate } = require('../middlewares/productValidationRules');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, productController.getAllProducts);
router.get('/:id', authMiddleware, productController.getProductById);
router.post('/', authMiddleware, productValidationRules, validate, productController.createProduct);
router.put('/:id', authMiddleware, productValidationRules, validate, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;