const { body, validationResult } = require('express-validator');

const productValidationRules = [
    body('name').isString().notEmpty().withMessage('Tên sản phẩm không hợp lệ!'),
    body('price').isFloat({ gt: 0}).withMessage('Giá phải lớn hơn 0!')
];

const validate = (req, res, next) =>  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

module.exports = {
    productValidationRules,
    validate
};
