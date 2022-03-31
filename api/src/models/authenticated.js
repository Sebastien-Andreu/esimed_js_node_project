const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secretOfAppli__9525+';

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) res.sendStatus(401)

    jwt.verify(token, secret, (err, user) => {
        if (err) res.sendStatus(403)
        req.user = user
        next()
    })
}