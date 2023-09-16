const conn = require('../../db')

const getUserInfo = (req, res) => {
    // console.log(req.auth.data.phone)
    conn.query(
        'select * from T_ADMIN where phone = ? limit 1',
        [req.auth.data.phone],
        (err, ret, fields) => {
            if (err) {
                res.json({
                    code: 500,
                    msg: '发生错误, ' + err,
                })
                console.log(err)
                return
            }
            if (ret.length == 0) {
                res.json({
                    code: 500,
                    msg: '未找到用户',
                })
                return
            }
            let info = ret[0]
            info.password = ''

            res.json({
                code: 1,
                data: info,
                msg: 'ok',
            })
        }
    )
}

module.exports = {
    getUserInfo,
}
