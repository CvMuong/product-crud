
module.exports = function(req, res, next) {
    const { name, price } = req.body;

    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Name is required!' });
    }

    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ message: 'Price is required and must be a positive numbet!' })
    }

    next();
}