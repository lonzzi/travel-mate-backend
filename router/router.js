const express = require('express')
const { expressjwt: jwt } = require('express-jwt')
const privateKey = require('../config').privateKey

const router = express.Router()
router.use(
    jwt({
        secret: privateKey,
        algorithms: ['HS256'],
    }).unless({
        path: ['/ping', '/user/login', '/user/register'],
    })
)

const authRouter = express.Router()
router.use(authRouter)

const auth = require('../controllers/auth/auth')
const user = require('../controllers/user/user')

// test api
router.get('/ping', (req, res) => {
    res.json({
        code: 1,
        data: 'pong',
        msg: 'ok',
    })
})

authRouter.post('/user/register', auth.register)
authRouter.post('/user/login', auth.login)

router.get('/user/info', user.getUserInfo)

module.exports = router
