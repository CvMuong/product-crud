const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Kiểm tra đã có user chưa
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            const error = new Error('Username already exists');
            error.status = 400;
            return next(error);
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashPassword
        });

        res.status(201).json({
            message: 'User registered successfully',
            userId: newUser._id
        });
    } catch (error) {
        next(error);
    }
};