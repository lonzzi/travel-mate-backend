const connection = require('../../db')

const query = (sql, arr) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, arr, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(JSON.parse(JSON.stringify(result)))
            }
        })
    })
}

module.exports = query
