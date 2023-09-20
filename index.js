const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
// const webSocket = require('ws')
const cors = require('cors')
const { unless } = require('express-unless')

const port = require('./config').port

const app = express()
app.use(cors())
app.disable('etag')

// const wss = new webSocket.Server({ port: 8891 })
// wss.on('connection', (ws) => {
//     ws.on('message', (message) => {
//         console.log(`Received message => ${message}`)
//     })
//     ws.send('Hello! Message From Server!!')
// })

const static = express.static('public')
static.unless = unless
app.use('/public', static.unless({ method: 'OPTIONS' }))

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const router = require('./router/router')
app.use(router)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
