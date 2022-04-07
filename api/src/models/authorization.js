module.exports = (req, res, next) => {
    if (req.user.role === 'admin'){
        next()
    } else {
        res.status(401).json('You have not access for this request');
    }
}