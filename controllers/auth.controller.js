const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User registered successfully',
            userId: newUser._id
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            const error = new Error('Invalid username or password!');
            error.status = 401;
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            const error = new Error('Invalid username or password!');
            error.status = 401;
            return next(error);
        }

        const payload = {
            userId: user._id,
            username: user.username
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'});

        res.json({ token, expiresIn: '1h' })
    } catch (error) {
        next(error);
    }
}