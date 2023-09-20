const mysql = require('mysql')
const dbConfig = require('./config').db

const connection = mysql.createConnection(dbConfig)

module.exports = connection
