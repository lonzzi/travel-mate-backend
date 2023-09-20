const express = require('express')
const { expressjwt: jwt } = require('express-jwt')
const privateKey = require('../config').privateKey
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage }).single('file')

const router = express.Router()

const authRouter = express.Router()
const verifyRouter = express.Router()
router.use(authRouter)
router.use(verifyRouter)

verifyRouter.use(
    jwt({
        secret: privateKey,
        algorithms: ['HS256'],
    }).unless({
        path: [
            '/ping',
            '/user/login',
            '/user/register',
            '/upload/img',
            '/public',
        ],
    })
)

const auth = require('../controllers/auth/auth')
const user = require('../controllers/user/user')
const post = require('../controllers/post/post')
const comment = require('../controllers/post/comment')
const hotel = require('../controllers/post/hotel')

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

verifyRouter.get('/user/info', user.getUserInfo)
verifyRouter.get('/user/rand', user.getRandUserInfo)
verifyRouter.get('/user/info/:id', user.getUserInfoById)
verifyRouter.post('/user/follow', user.follow)
verifyRouter.post('/user/update', user.updateUserInfo)

verifyRouter.post('/post/upload', post.publishPost)
verifyRouter.get('/post/info', post.getPostById)
verifyRouter.get('/post/rand', post.getRandPost)

verifyRouter.post('/post/comment', comment.createComment)
verifyRouter.get('/post/comment/info', comment.getCommentList)

verifyRouter.get('/hotel/rand', hotel.getRandHotel)
verifyRouter.get('/hotel/info', hotel.getHotelById)

verifyRouter.post('/upload/img', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.json({
                code: 500,
                msg: '发生错误, ' + err,
            })
        } else {
            res.json({
                code: 1,
                data: {
                    url: req.file.destination + req.file.filename,
                },
                msg: 'ok',
            })
        }
    })
})

module.exports = router
