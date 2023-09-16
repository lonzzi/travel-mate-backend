const jwt = require('jsonwebtoken')
const privateKey = require('../config').privateKey

const generateToken = (data) => {
    return jwt.sign(
        {
            data,
        },
        privateKey,
        {
            expiresIn: 3600 * 24 * 3,
        }
    )
}

const verifyToken = (token) => {
    return jwt.verify(token, privateKey)
}

module.exports = {
    generateToken,
    verifyToken,
}
