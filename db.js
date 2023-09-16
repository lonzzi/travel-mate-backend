const mysql = require('mysql')
const dbConfig = require('./config').db

module.exports = mysql.createConnection(dbConfig)