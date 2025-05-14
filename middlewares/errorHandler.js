module.exports = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    if (process.env.NODE_ENV === 'development') {
        console.error('Lỗi chi tiết: ', err.stack);
    }

    res.status(status).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};