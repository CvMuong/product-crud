const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const validateProduct = require('../middlewares/validateProduct');
const { productValidationRules, validate } = require('../middlewares/productValidationRules');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productValidationRules, validate, productController.createProduct);
router.put('/:id', productValidationRules, validate, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;