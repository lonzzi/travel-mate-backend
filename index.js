const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = require('./config').port

const app = express()

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const router = require('./router/router')
app.use(router)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
