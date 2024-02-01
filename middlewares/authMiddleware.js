const jwt = require('jsonwebtoken');
const {hash} = require('../crypto/config');

function generateToken(user) {
    return jwt.sign({ user: user.id }, hash, {
        expiresIn: '1h',
    });
}

function verifyToken(req, res, next) {
    const token = req.session.token;
    console.log(token)
    if (!token) {
        return res.status(401).json({ mensaje: 'token no generado' });
    }

    jwt.verify(token, hash, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensaje: 'token inválido' });
        }
        req.user = decoded.user;
        next();
    });
}

module.exports = { generateToken, verifyToken };